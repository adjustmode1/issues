const express = require('express');
const bodyParser = require('body-parser');

// Khởi tạo Express app
const app = express();
const port = 3000;

// Middleware để phân tích các yêu cầu POST từ GitHub
app.use(bodyParser.json());

// Route để xử lý yêu cầu POST từ Webhook
app.post('/webhook', (req, res) => {
  // Trích xuất thông tin từ payload được gửi bởi GitHub
  const payload = req.body;
  const issue = payload.issue;

  console.log('payload: ',JSON.stringify(payload, null, 2))
  console.log('issue: ',JSON.stringify(issue, null, 2))

  // Kiểm tra nếu trường "story point" đã thay đổi
  if (payload.action === 'edited' && 'changes' in payload && 'story_point' in payload.changes) {
    const newPoint = payload.changes.story_point;
    
    // Cập nhật comment của issue
    const comment = `The story point has been updated to ${newPoint}.`;
    // Gửi yêu cầu API đến GitHub để cập nhật comment
    // (Chưa triển khai đoạn này, đây chỉ là ví dụ)
    // Tùy thuộc vào framework và thư viện bạn sử dụng, bạn có thể sử dụng các công cụ như Axios hoặc Fetch để gửi yêu cầu API.
  }

  res.sendStatus(200);
});

// Khởi động máy chủ
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});