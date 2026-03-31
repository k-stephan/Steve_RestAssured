const ipl:string[]=["srh","mi","rr"]

function balancesreverse(arr:string[]):string[]
{

    const reverse:string[]=[];

    for (let i=arr.length-1;i>=0;i--)
    {
        reverse.push(arr[i]);
    }

    return reverse;
}
console.log(balancesreverse(ipl));
---------------------------------------------

const  s="annual data and annual summary data";
const str=s.split(" ");
hmap= new Map();
for (let i=0; i<str.length;i++)
    {
        hmap.set(str[i], (hmap.get(str[i]) || 0) + 1);
    }
console.log(hmap);

-----------------------------------------------------------
let nums = [1, 2, 3, 4];

let sum = nums.reduce((acc, curr) => acc + curr, 0);