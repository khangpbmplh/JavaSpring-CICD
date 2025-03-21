import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/common/Order';
import { OrderDetail } from 'src/app/common/OrderDetail';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';
// import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  orderDetails!: OrderDetail[];
  order!: Order;
  listData!: MatTableDataSource<OrderDetail>;
  orderDetailLength!: number;

  columns: string[] = ['index', 'image', 'product', 'quantity', 'price'];

  @Output()
  updateFinish: EventEmitter<any> = new EventEmitter<any>();
  @Input() orderId!: number;

  constructor(private modalService: NgbModal, private orderService: OrderService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getOrder();
    this.getDetail();
  }

  getOrder() {
    this.orderService.getById(this.orderId).subscribe(data => {
      this.order = data as Order;
    }, error => {
      this.toastr.error('Lỗi! ' + error.status, 'Hệ thống');
    })
  }

  getDetail() {
    this.orderService.getByOrder(this.orderId).subscribe(data => {
      this.orderDetails = data as OrderDetail[];
      this.listData = new MatTableDataSource(this.orderDetails);
      this.orderDetailLength = this.orderDetails.length;
    }, error => {
      this.toastr.error('Lỗi! ' + error.status, 'Hệ thống');
    })
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  deliver() {
    Swal.fire({
      title: 'Bạn muốn xác nhận đơn hàng này ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.deliver(this.orderId).subscribe(data => {
          this.toastr.success('Xác nhận thành công!', 'Hệ thống');
          this.updateFinish.emit('done');
          this.modalService.dismissAll();
        }, error => {
          this.toastr.error('Lỗi! ' + error.status, 'Hệ thống');
        })
      }
    })
  }

  cancel() {
    Swal.fire({
      title: 'Bạn muốn huỷ đơn hàng này ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Huỷ',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.cancel(this.orderId).subscribe(data => {
          this.toastr.success('Huỷ thành công!', 'Hệ thống');
          this.updateFinish.emit('done');
          this.modalService.dismissAll();
        }, error => {
          this.toastr.error('Lỗi! ' + error.status, 'Hệ thống');
        })
      }
    })
  }

  confirm() {
    Swal.fire({
      title: 'Bạn muốn xác nhận đơn hàng này đã thanh toán?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.success(this.orderId).subscribe(data => {
          this.toastr.success('Xác nhận thành công!', 'Hệ thống');
          this.updateFinish.emit('done');
          this.modalService.dismissAll();
        }, error => {
          this.toastr.error('Lỗi! ' + error.status, 'Hệ thống');
        })
      }
    })
  }

  // xuat hoa don
//   exportInvoice() {
//     const doc = new jsPDF();

//     // dat font chu
//     doc.setFont('Roboto', 'bold');
//     doc.setTextColor(0, 0, 0); // Black color for header

//     // them header
//     doc.setFontSize(24);
//     doc.text('Hoa Don Ban Hang', 10, 20);
    
//     // ma hoa don
//     doc.setFontSize(12);
//     doc.setDrawColor(0, 0, 0); // Black border
//     doc.rect(150, 10, 40, 15); // Invoice number box
//     const orderIdText = doc.splitTextToSize(`Ma don hang: ${this.order.ordersId}`, 38); // Chia văn bản thành các dòng có kích thước phù hợp
//     doc.text(orderIdText, 152, 20); // Điều chỉnh vị trí văn bản bên trong hình vuông

//     // Shipping Address
//     const shippingAddress = [
//       "Dia chi nhan hang:",
//       this.order.address,
//       "So dien thoai:",
//       this.order.phone
//   ];
//   doc.text(shippingAddress.join('\n'), 150, 40);

//     // Date Issued and Issued to
//     doc.setFontSize(12);
//     doc.setTextColor(0, 0, 0);
//     doc.text(`Ngay dat hang:\n${new Date(this.order.orderDate).toLocaleDateString()}`, 10, 40);
//     doc.text(`Ten khach hang:\n${this.order.user.name}`, 10, 55);


//     // Add table header
//     doc.setFillColor(200, 200, 200); // Light gray background for table header
//     doc.rect(10, 70, 190, 10, 'F');
//     doc.setTextColor(0, 0, 0);
//     doc.text('San pham', 15, 75);
//     doc.text('So luong', 85, 75);
//     doc.text('Don gia', 125, 75);
//     doc.text('Thanh tien', 165, 75);

//     // Add table rows
//     let startY = 85;
//     let subtotal = 0;
//     this.orderDetails.forEach((detail) => {
//         const total = detail.quantity * detail.price;
//         subtotal += total;

//         doc.setTextColor(0, 0, 0);
//         doc.text(`${detail.product.name}`, 15, startY);
//         doc.text(`${detail.quantity}`, 90, startY, { align: 'right' });
//         doc.text(`${detail.price.toLocaleString('vi-VN')}`, 130, startY, { align: 'right' });
//         doc.text(`${total.toLocaleString('vi-VN')}`, 180, startY, { align: 'right' });

//         startY += 10;
//     });

//     doc.setFont('Roboto', 'bold');
//     doc.text(`Tong tien: ${subtotal.toLocaleString('vi-VN')}`, 180, startY + 10, { align: 'right' });

//     doc.save('Hóa đơn bán hàng.pdf');
// }

}
