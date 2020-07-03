const express = require('express');
const knex = require('../db/client');

const router = express.Router();
const cookieParser = require('cookie-parser');

const methods = require('../functions.js');

router.use(cookieParser());

router.use(express.urlencoded({
  extended: true
}));

// Get /new - Create a new cohort page
router.get('/new', (req, res) => {
  res.render('pages/new');
});

// POST /new - Post the new cohort data
router.post('/new', (req, res) => {
  knex
    .insert({
      imgURL: req.body.imgURL,
      name: req.body.cohortName
    })
    .into('cohorts')
    .returning('*')
    .then(([cohort]) => {
      for (let member of req.body.members.split(',')) {
        knex
          .insert({
            name: member.trim(),
            cohort_name: req.body.cohortName,
            cohort_id: cohort.id
          })
          .into('members')
          .returning('*')
          .then(([member]) => {

          });
      }
      res.redirect('/cohorts');
    });
});

//
router.get('/', (req, res) => {
  knex
    .select('*', 'cohorts.id', 'members.name')
    .from('members')
    .innerJoin('cohorts', 'members.cohort_name', 'cohorts.name')
    .then(allMembersWithCohorts => {

      if (allMembersWithCohorts.length > 0) {
        const orderedCohorts = {};

        let i = 0;
        for (let member of allMembersWithCohorts) {
          if (!orderedCohorts[member.cohort_name]) {

            orderedCohorts[member.cohort_name] = {
              members: [member.name],
              imgURL: member.imgURL,
              id: member.cohort_id
            };
          } else {
            orderedCohorts[member.cohort_name]["members"].push(member.name);
          }

          if (i == allMembersWithCohorts.length - 1) {
            res.render('pages/cohorts', {
              orderedCohorts
            });
          }
          i += 1;
        }
      } else {
        res.render("pages/cohorts", {
          orderedCohorts: undefined
        })
      }
    });
});

router.get('/:id', (req, res) => {
  knex
    .select('cohort_name', 'members.name', "imgURL")
    .from('members')
    .where('cohorts.id', req.params.id)
    .innerJoin('cohorts', 'members.cohort_name', 'cohorts.name')
    .then(cohortMembers => {
      if (cohortMembers.length > 0) {
        const cohort = {
          members: []
        };
        let i = 0;
        for (let member of cohortMembers) {
          cohort["members"].push(member.name);

          if (i == cohortMembers.length - 1) {
            cohort["cohortName"] = member.cohort_name;
            cohort["id"] = req.params.id;
            cohort["imgURL"] = member.imgURL

            if (req.cookies.request) {
              let request = JSON.parse(req.cookies.request);
              res.clearCookie('request');
              let teams;
              switch (request.option) {
                case "teamCount":
                  teams = methods.teamCount(request.quantity, methods.randomize(cohort["members"]));
                  break;
                case "numPerTeams":
                  teams = methods.numPerTeams(request.quantity, methods.randomize(cohort["members"]));
                  break;
              }

              res.render('pages/cohort', {
                cohort,
                request,
                teams
              });
            } else {
              res.render('pages/cohort', {
                cohort,
                request: undefined,
                teams: undefined
              });
            }

          }
          i += 1;
        }
      } else {
        res.render('pages/cohort', {
          cohort: undefined,
          request: undefined,
          teams: undefined
        })
      }
    });
});

router.post('/:id/teams', (req, res) => {

  const id = req.params.id;
  res.cookie("request", JSON.stringify(req.body));
  res.redirect('/cohorts/' + req.params.id);

});


router.delete('/:id', (req, res) => {
  const id = req.params.id;

  knex('cohorts')
    .where('id', id)
    .del()
    .then(() => {
      knex('members')
        .where('cohort_id', id)
        .del()
        .then(() => {
          res.redirect('/cohorts');
        })
    });

});

router.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  knex
    .select('cohort_name', 'members.name', "imgURL")
    .from('members')
    .where('cohorts.id', req.params.id)
    .innerJoin('cohorts', 'members.cohort_name', 'cohorts.name')
    .then(cohortMembers => {
      if (cohortMembers) {
        const cohort = {
          members: []
        };
        let i = 0;
        for (let member of cohortMembers) {
          cohort["members"].push(member.name);

          if (i == cohortMembers.length - 1) {
            cohort["cohortName"] = member.cohort_name;
            cohort["id"] = req.params.id;
            cohort["imgURL"] = member.imgURL;
          }
          i += 1;
        }
        res.render('pages/edit', {
          cohort
        });

      } else {
        res.send("pages/edit", {
          cohort: undefined
        });
      }
    });

});

router.patch('/:id', (req, res) => {

  const id = req.params.id;

  const members = req.body.members.split(', ');

  const newCohort = {
    name: req.body.cohortName,
    imgURL: req.body.imgURL
  }

  knex('cohorts')
    .where('id', id)
    .update(newCohort)
    .returning('*')
    .then((updatedRows) => {

      knex('members')
      .where('cohort_id', id)
      .del()
      .then(() => {
        let i = 0;
        for (let member of members) {

          const newMember = {
            name: member,
            cohort_id: id,
            cohort_name: newCohort.name
          }
          i += 1;
          knex
          .insert(newMember)
          .into('members')
          .returning('*')
          .then(() => {});

          if (i == members.length - 1) {
            res.redirect('/cohorts');
          }
        }
        
      });
    });

  // if (updatedRows.length) {

  //   res.render('cohorts/show', {cohort: updatedRows[0]});
  // }


});


module.exports = router;