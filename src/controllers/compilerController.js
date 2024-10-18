import path from 'path';
import fs from 'fs';  
import { exec } from 'child_process';

export const compileJavaCode = (req, res) => {
    const { code } = req.body;

    const dir = path.join('../../public/java_files');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });  
    }

    const fileName = path.join(dir, 'Main.java');
    
    try {
        fs.writeFileSync(fileName, code);
    } catch (writeErr) {
        return res.status(500).json({ error: `Failed to write Java code to file: ${writeErr.message}` });
    }

    exec(`javac ${fileName} && java -cp ${dir} Main`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: stderr || error.message });
        }
        res.json({ output: stdout });
    });
};
