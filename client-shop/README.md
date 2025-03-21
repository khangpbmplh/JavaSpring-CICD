# Client Shop - Laptopshop

Frontend ứng dụng cho người dùng của hệ thống Laptopshop.

## Công nghệ sử dụng
- Angular 12.1.5
- Bootstrap 5.1.3
- NgBootstrap 10.0.0
- JWT Authentication
- NgxPayPal 8.0.0
- NgxSlickCarousel 0.6.0

## CI/CD với GitHub Pages

Dự án này được cấu hình để tự động triển khai lên GitHub Pages khi có thay đổi trên nhánh main hoặc master.

### Quy trình CI/CD
1. **Build và Test**
   - Cài đặt dependencies
   - Chạy unit tests
   - Build ứng dụng cho production

2. **Deploy**
   - Tự động deploy lên GitHub Pages
   - Truy cập ứng dụng tại: https://[username].github.io/Laptopshop-final/

### Kích hoạt Workflow
Workflow sẽ chạy trong các trường hợp:
- Push code lên nhánh main hoặc master
- Tạo Pull Request vào main hoặc master
- Kích hoạt thủ công từ tab Actions

## Phát triển

### Yêu cầu
- Node.js 14.x
- npm 6.x trở lên

### Cài đặt
```bash
npm install
```

### Chạy môi trường phát triển
```bash
npm start
```

### Build cho môi trường production
```bash
npm run build --prod
```

### Chạy test
```bash
npm test
```

## Lưu ý
- Đảm bảo repository đã bật tính năng GitHub Pages
- Branch gh-pages sẽ được tạo tự động
- Base href trong build command phải khớp với tên repository

## CI/CD

Dự án này được cấu hình với nhiều workflow CI/CD để tự động hóa quá trình phát triển và triển khai:

### 1. Standard CI/CD (client-shop-cicd.yml)
- Build và test ứng dụng
- Đóng gói và đẩy Docker image lên Docker Hub
- Triển khai lên server thông qua SSH

### 2. Azure Static Web Apps (azure-static-web-apps.yml)
- Triển khai ứng dụng lên Azure Static Web Apps
- Tự động tạo môi trường preview cho Pull Requests

### 3. Build & Publish (npm-publish.yml)
- Build và test ứng dụng
- Đóng gói và đẩy Docker image lên GitHub Container Registry

### 4. SonarCloud Analysis (sonarcloud.yml)
- Phân tích chất lượng mã nguồn
- Tạo báo cáo độ phủ test
- Phát hiện lỗi và vấn đề tiềm ẩn

## Docker

### Build Docker image
```bash
docker build -t laptopshop-client-shop .
```

### Chạy Docker container
```bash
docker run -p 80:80 laptopshop-client-shop
```
