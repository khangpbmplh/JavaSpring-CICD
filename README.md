# Client Shop - Laptopshop

Frontend ứng dụng cho người dùng của hệ thống Laptopshop.

## Continuous Integration (CI)

Dự án này sử dụng GitHub Actions để tự động hóa quy trình kiểm tra và xây dựng.

### Workflow CI

Workflow sẽ được kích hoạt khi:
- Push code lên nhánh main hoặc master
- Tạo Pull Request vào main hoặc master
- Kích hoạt thủ công từ tab Actions

### Các bước trong CI pipeline:

1. **Setup môi trường**
   - Checkout code
   - Cài đặt Node.js 14
   - Cache npm dependencies

2. **Kiểm tra chất lượng**
   - Cài đặt dependencies
   - Chạy linting
   - Chạy unit tests với Chrome Headless

3. **Build**
   - Build ứng dụng cho production
   - Lưu trữ build artifacts

### Artifacts

Build artifacts sẽ được lưu trữ trong 5 ngày và có thể tải xuống từ tab Actions.

## Phát triển

### Yêu cầu
- Node.js 14.x
- npm 6.x trở lên

### Cài đặt
```bash
npm install
```

### Các lệnh có sẵn
```bash
# Chạy môi trường development
npm start

# Build cho production
npm run build

# Chạy unit tests
npm test

# Chạy linting
npm run lint
```

## Công nghệ sử dụng
- Angular 12.1.5
- Bootstrap 5.1.3
- NgBootstrap 10.0.0
- JWT Authentication
- NgxPayPal 8.0.0
- NgxSlickCarousel 0.6.0
