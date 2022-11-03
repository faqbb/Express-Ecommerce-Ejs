import yargs from "yargs";

 const yargInstance = yargs(process.argv.slice(2)).default({
    p: 8080,
    }).alias({
        p: "PORT",
    })

const {
    PORT,
    _
} = yargInstance.argv


 const config = {
    port: PORT,
    others: _
}

export default config