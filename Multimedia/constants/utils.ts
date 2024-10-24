export const getRandomColor = () => {
    let r: number, g: number, b: number;

    const min = 50;
    const max = 205;

    r = Math.floor(Math.random() * (max - min + 1)) + min;
    g = Math.floor(Math.random() * (max - min + 1)) + min;
    b = Math.floor(Math.random() * (max - min + 1)) + min;
    

    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
}