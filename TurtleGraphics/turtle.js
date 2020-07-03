class Turtle {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.direction = "east";
        this.history = [[x, y]];
        if (x > 20) {
            this.maxWidth = x;
        } else {
            this.maxWidth = 20;
        }
        if (x < -20) {
            this.minWidth = x;
        } else {
            this.minWidth = -20;
        }
        if (y > 10) {
            this.maxHeight = y;
        } else {
            this.maxHeight = 10;
        }
        if (y < -10) {
            this.minHeight = y;
        } else {
            this.minHeight = -10;
        }
    }
    forward(steps) {
        switch (this.direction) {
            case "east":
                for (let i = 1; i <= steps; i++){
                    this.x++;
                    this.history.push([this.x, this.y]);    
                }
                if (this.x > this.maxWidth) {
                    this.maxWidth = this.x;
                }
                break;
            case "south":
                for (let i = 1; i <= steps; i++) {
                    this.y--;
                    this.history.push([this.x, this.y]);
                }
                if (this.y < this.minHeight) {
                    this.minHeight = this.y;
                }
                break; 
            case "west":
                for (let i = 1; i <= steps; i++) {
                    this.x--;
                    this.history.push([this.x, this.y]);
                }
                if (this.x < this.minWidth) {
                    this.minWidth = this.x;
                }
                break;
            case "north":
                for (let i = 1; i <= steps; i++){
                    this.y++;
                    this.history.push([this.x, this.y]);
                }
                if (this.y > this.maxHeight) {
                    this.maxHeight = this.y;
                }
                break;
        }
        return this;
    }
    allPoints() {
        return this.history;
    }
    right() {
        switch (this.direction) {
            case 'east':
                this.direction = 'south';
                break;
            case 'south':
                this.direction = 'west';
                break;
            case 'west':
                this.direction = 'north';
                break;
            case 'north':
                this.direction = 'east';
                break;
        }
        return this;
    }
    left() {    
        switch (this.direction) {
            case 'east':
                this.direction = 'north';
                break;
            case 'south':
                this.direction = 'east';
                break;
            case 'west':
                this.direction = 'south';
                break;
            case 'north':
                this.direction = 'west';
                break;
        }
        return this;
    }
    YIntercept(y) {
        let yBorder = '\u2503';
        for (let point of this.history) {
            if (point[0] === 0 && point[1] === y) {
                yBorder = '\u265e';
            } 
        }      
        return yBorder;
    }
    XIntercept() {
        let xBorder = '  0 ';
        for (let column = this.minWidth; column <= this.maxWidth; column++) {
            let isOnTrack;
            for (let point of this.history) {
                if (column === 0) {
                    isOnTrack = '\u254B';
                    for (let index of this.history) {
                        if (index[0] === 0 && index[1] === 0) {
                            isOnTrack = '\u265E';
                        } 
                    }
                    break;
                } else if (point[1] === 0 && point[0] === column) {
                    isOnTrack = '\u265E';
                    break;
                } else {
                    isOnTrack = '\u2501';
                }
            } 
            xBorder += isOnTrack;
        }
        return xBorder + '\n';
    }
    printT2(y) {
        let xCoordinates = [];
        let T2Line = '    ';
        if (y % 5 === 0) {
            T2Line = ' '.repeat(3 - y.toString().length) + y + ' ';
        }
        this.history.forEach(point => {
            if (point[1] === y) {
                xCoordinates.push(point[0]);
            }
        });
        for (let column = this.minWidth; column < 0; column++) {
            let isOnTrack = false;
            xCoordinates.forEach(coordinate => {
                if (coordinate === column) {
                    isOnTrack = true;
                }
            });
            if (isOnTrack) {
                T2Line += '\u265e';
            } else {
                T2Line += '';
            }
        }
        return T2Line;
    }
    printT1andT2() {
        let line = '';
        for (let row = this.maxHeight; row > 0; row--) {
            let rowOutput = this.YIntercept(row);
            let xCoordinates = [];
            for (let point of this.history) {
                if (point[1] === row) {
                    xCoordinates.push(point[0]);
                }
            }
            for (let column = 1; column <= this.maxWidth; column++) {
                let isOnTrack = false;
                xCoordinates.forEach(coordinate => {
                    if (coordinate === column) {
                        isOnTrack = true;
                    }
                });
                if (isOnTrack) {
                    rowOutput += '\u265e';
                } else {
                    rowOutput += '';
                }
            }
            line += this.printT2(row) + rowOutput + '\n';
        }   
        return line;
    }

    
    printT3(y) {
        let xCoordinates = [];
        let T3Line = '    ';
        if (y % 5 === -0) {
            T3Line = ' '.repeat(3 - y.toString().length) + y + ' ';
        }
        this.history.forEach(point => {
            if (point[1] === y) {
                xCoordinates.push(point[0]);
            }
        });

        for (let column = this.minWidth; column < 0; column++) {
            let isOnTrack = false;
            xCoordinates.forEach(coordinate => {
                if (coordinate === column) {
                    isOnTrack = true;
                }
            });

            if (isOnTrack) {
                T3Line += '\u265e';
            } else {
                T3Line += '';
            }
        }
        return T3Line;
    }


    printT3andT4() {
        let line = '';
        for (let row = -1; row >= this.minHeight; row--) {
            let rowOutput = this.YIntercept(row);
            let  xCoordinates = [];
            for (let point of this.history) {
                if (point[1] === row) {
                    xCoordinates.push(point[0]);
                }
            }
            for (let column = 1; column <= this.maxWidth; column++) {
                let isOnTrack = false;
                xCoordinates.forEach(coordinate => {
                    if (coordinate === column) {
                        isOnTrack = true;
                    }
                });
                if (isOnTrack) {
                    rowOutput += '\u265e';
                } else {
                    rowOutput += '';
                }
            }
            line += this.printT3(row) + rowOutput + '\n';
        }
        return line;
    }
    printGrid() {
        return this.printT1andT2() + this.XIntercept() + this.printT3andT4();
    }
}
if (process.argv[2]) {
    const turtleMove = process.argv[2];
    const commands = process.argv[2].split('_').slice(1);
    const startingPoint = turtleMove.split('_')[0].split(',');
    const flash = new Turtle(parseInt(startingPoint[0].slice(1)), parseInt(startingPoint[1]));
    for (let command of commands) {
        if (command.startsWith('f')) {
            flash.forward(parseInt(command.slice(1)));
        } 
        else if (command.startsWith('r')) {
            flash.right();
        } else {
            flash.left();
        }

    console.log(flash.allPoints());
    console.log(flash.printGrid());
    }
} 

else {
    const starex = new Turtle(-5, 9);
    starex 
    .forward(3)
    .left()
    .forward(3)
    .right()
    .forward(5)
    .right()
    .forward(8)
    .right()
    .forward(5)
    console.log(starex.allPoints());
    console.log(starex.printGrid());
}