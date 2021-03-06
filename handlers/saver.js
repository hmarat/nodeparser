import fs from "fs"
import path from "path"

const saveData = (data) => {
    fs.writeFile(path.join(__dirname, "../data/companies.json"), JSON.stringify(data), err => {
        if (err)
            throw err
    })
}

export default saveData;