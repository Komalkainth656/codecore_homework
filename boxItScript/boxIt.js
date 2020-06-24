const box_It = {
    content: process.argv.slice(2),
    max_length() {
        let max = 0;
        for (let string of this.content) {
            if (string.length > max) {
                max = string.length;
            }
        }    
        return max;
    },
    drawline() {
        return '\u2501'.repeat(this.max_length());
    },
    drawTopBorder() {
        return `\u250F${this.drawline()}\u2513`;
    },
    drawMiddleBorder() {
        return `\u2523${this.drawline()}\u252B`;
    },
    drawBottomBorder() {
        return `\u2517${this.drawline()}\u251B`;
    },
    drawBarsAround(string) {
        return `\u2503${string}${' '.repeat(this.max_length() - string.length)}\u2503`;
    },
    boxIt() {
        const arr = this.content;
        let output = `${this.drawTopBorder()}\n`;
        if (arr.length !== 0) {
            for (let string of arr.slice(0, arr.length - 1)) {
                output += this.drawBarsAround(string) + '\n'
                        + this.drawMiddleBorder() + '\n'
            }
            return output + `${this.drawBarsAround(arr[arr.length - 1])}\n${this.drawBottomBorder()}`;
        } else {
            return `${this.drawTopBorder()}\n${this.drawBottomBorder()}`;
        }
    }
}
console.log(box_It.boxIt());
