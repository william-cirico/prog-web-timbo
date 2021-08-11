require("dotenv").config();
const db = require("./db");

console.log(process.env);

(async () => {
    try {
        const res = await db.query("SELECT NOW()");
        console.log(res.rows[0]);
    } catch (err) {
        console.log(err.message);
    } finally {
        db.end();
    }    
})();