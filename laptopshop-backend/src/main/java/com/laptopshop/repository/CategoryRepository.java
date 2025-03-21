package com.laptopshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.laptopshop.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{
    Category findByCategoryName(String categoryName);

}