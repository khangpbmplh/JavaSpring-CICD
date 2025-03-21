package com.laptopshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.laptopshop.entity.Favorite;
import com.laptopshop.entity.Product;
import com.laptopshop.entity.User;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

	List<Favorite> findByUser(User user);

	Integer countByProduct(Product product);

	Favorite findByProductAndUser(Product product, User user);

}
