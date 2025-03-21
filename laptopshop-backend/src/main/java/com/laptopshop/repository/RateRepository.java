package com.laptopshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.laptopshop.entity.OrderDetail;
import com.laptopshop.entity.Product;
import com.laptopshop.entity.Rate;

@Repository
public interface RateRepository extends JpaRepository<Rate, Long> {

	List<Rate> findAllByOrderByIdDesc();

	Rate findByOrderDetail(OrderDetail orderDetail);

	List<Rate> findByProductOrderByIdDesc(Product product);

}
