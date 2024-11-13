//npm init -y
//
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { createObjectCsvWriter } = require('csv-writer');
const app = express();
const PORT = 3000;

// 使用 body-parser 解析 JSON 数据
app.use(bodyParser.json());

// 配置CSV写入器
const csvWriter = createObjectCsvWriter({
    path: 'experiment_data.csv',
    header: [
        { id: 'email', title: 'メールアドレス' },
        { id: 'nickname', title: 'ニックネーム' }
    ],
    append: true // 如果文件已存在，则追加内容
});

// 处理保存实验数据的请求
app.post('/save-experiment-data', (req, res) => {
    const { email, nickname } = req.body;

    // 将数据保存到 CSV 文件
    csvWriter.writeRecords([{ email, nickname }])
        .then(() => {
            res.json({ message: 'データがCSVに保存されました！' });
        })
        .catch((err) => {
            console.error('CSVへの保存中にエラーが発生しました:', err);
            res.status(500).json({ message: 'データの保存中にエラーが発生しました' });
        });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`サーバーがポート ${PORT} で起動しました`);
});

