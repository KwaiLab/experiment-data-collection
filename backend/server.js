const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const frontendDir = path.resolve(__dirname, '../frontend');


app.use(cors()); 
app.use(bodyParser.json({ limit: '10mb' })); 
app.use(express.static(frontendDir));

app.get('/', (req, res) => {
    res.sendFile(path.join(frontendDir, 'html/index.html'));
});

app.get('/html/camera.html', (req, res) => {
    const filePath = path.join(frontendDir, 'html/camera.html');
    console.log('Serving camera.html from:', filePath); 
    res.sendFile(filePath);
});

let postCount = 0; 

app.post('/save-experiment-data', (req, res) => {
    try {
        console.log('Received request body:', req.body);

        const { email, password } = req.body; 

        if (!email || !password) { 
            console.log('Validation failed: missing email or password');
            return res.status(400).send({ message: 'メールアドレスまたはパスワードが未入力です。' });
        }

        postCount += 1;
        console.log(`Post count updated: ${postCount}`);

        res.status(200).send({
            email: email,
            password: password,
            postCount,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Error in /save-experiment-data:', error);
        res.status(500).send({ message: 'サーバーエラーが発生しました。' });
    }
});

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

app.post('/upload', (req, res) => {
    const { tags, comment, photo } = req.body;

    if (!photo || !photo.startsWith('data:image/png;base64,')) {
        return res.status(400).send('無効な写真データです。写真を撮影してください。');
    }

    const base64Data = photo.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const filePath = path.join(uploadDir, `photo_${Date.now()}.png`);

    try {
        fs.writeFileSync(filePath, buffer);
        console.log('写真保存成功:', filePath);

        const saveData = {
            tags: tags,
            comment: comment,
            photoPath: filePath,
            timestamp: new Date().toISOString(),
        };

        const jsonFilePath = path.join(uploadDir, 'data.json');
        const existingData = fs.existsSync(jsonFilePath)
            ? JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'))
            : [];
        existingData.push(saveData);
        fs.writeFileSync(jsonFilePath, JSON.stringify(existingData, null, 2));

        console.log('受信データ:', saveData);
        res.status(200).send({
            message: 'アップロードが完了しました！',
            filePath,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('写真保存失败:', error);
        res.status(500).send('サーバーエラーが発生しました。');
    }
});

app.listen(PORT, () => {
    console.log(`サーバーが起動しました: http://localhost:${PORT}`);
});
