package com.laptopshop.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laptopshop.dto.CategoryBestSeller;
import com.laptopshop.dto.Statistical;
import com.laptopshop.entity.Order;
import com.laptopshop.entity.Product;
import com.laptopshop.repository.OrderRepository;
import com.laptopshop.repository.ProductRepository;
import com.laptopshop.repository.StatisticalRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/statistical")
public class StatisticalApi {

	@Autowired
	StatisticalRepository statisticalRepository;

	@Autowired
	OrderRepository orderRepository;

	@Autowired
	ProductRepository productRepository;

	//Lấy danh sách thống kê doanh thu theo từng tháng trong một năm cụ thể.
	@GetMapping("{year}")
	public ResponseEntity<List<Statistical>> getStatisticalYear(@PathVariable("year") int year) {
		List<Object[]> list = statisticalRepository.getMonthOfYear(year);
		List<Statistical> listSta = new ArrayList<>();
		List<Statistical> listReal = new ArrayList<>();
        for (Object[] objects : list) {
            Statistical sta = new Statistical((int) objects[1], null, (Double) objects[0], 0);
            listSta.add(sta);
        }
		for (int i = 1; i < 13; i++) {
			Statistical sta = new Statistical(i, null, 0.0, 0);
            for (Statistical statistical : listSta) {
                if (statistical.getMonth() == i) {
                    listReal.remove(sta);
                    listReal.add(statistical);
                    break;
                } else {
                    listReal.remove(sta);
                    listReal.add(sta);
                }
            }
		}
		return ResponseEntity.ok(listReal);
	}

	//Trả về danh sách các năm có dữ liệu trong database
	@GetMapping("/countYear")
	public ResponseEntity<List<Integer>> getYears() {
		return ResponseEntity.ok(statisticalRepository.getYears());
	}

	//Tính tổng doanh thu của một năm cụ thể.
	@GetMapping("/revenue/year/{year}")
	public ResponseEntity<Double> getRevenueByYear(@PathVariable("year") int year) {
		return ResponseEntity.ok(statisticalRepository.getRevenueByYear(year));
	}

	//Lấy danh sách tất cả các đơn hàng thành công
	@GetMapping("/get-all-order-success")
	public ResponseEntity<List<Order>> getAllOrderSuccess() {
		return ResponseEntity.ok(orderRepository.findByStatus(2));
	}

	//Lấy danh sách các danh mục bán chạy nhất.
	@GetMapping("/get-category-seller")
	public ResponseEntity<List<CategoryBestSeller>> getCategoryBestSeller() {
		List<Object[]> list = statisticalRepository.getCategoryBestSeller();
		List<CategoryBestSeller> listCategoryBestSeller = new ArrayList<>();
        for (Object[] objects : list) {
            CategoryBestSeller categoryBestSeller = new CategoryBestSeller(String.valueOf(objects[1]),
                    Integer.parseInt(String.valueOf(objects[0])), Double.valueOf(String.valueOf(objects[2])));
            listCategoryBestSeller.add(categoryBestSeller);
        }
		return ResponseEntity.ok(listCategoryBestSeller);
	}

	//Lấy danh sách sản phẩm còn tồn kho, sắp xếp theo số lượng giảm dần.
	@GetMapping("/get-inventory")
	public ResponseEntity<List<Product>> getInventory() {
		return ResponseEntity.ok(productRepository.findByStatusTrueOrderByQuantityDesc());
	}

}
