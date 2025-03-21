package com.laptopshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.laptopshop.entity.Cart;
import com.laptopshop.entity.CartDetail;

@Repository
public interface CartDetailRepository extends JpaRepository<CartDetail, Long> {

	List<CartDetail> findByCart(Cart cart);

	void deleteByCart(Cart cart);

}
