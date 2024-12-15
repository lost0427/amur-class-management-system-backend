import test_database from "./database";

test_database()
    .then(() => console.log("Test completed"))
    .catch((error) => console.error(error))