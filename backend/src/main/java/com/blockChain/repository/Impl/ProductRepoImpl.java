package com.blockChain.repository.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.blockChain.domain.Product;
import com.blockChain.domain.QProduct;
import com.blockChain.domain.QProduct_Media;
import com.blockChain.dto.CardForSalesDTO;
import com.blockChain.repository.ProductRepoCustom;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ProductRepoImpl implements ProductRepoCustom{
	private final JPAQueryFactory queryFactory;

	@Override
	public Optional<Product> sltByNM(String NM){
		QProduct qp = QProduct.product;
		return Optional.ofNullable(queryFactory.selectFrom(qp).where(qp.productNm.eq(NM)).fetchOne());
	}
	
	//성별따라 조회
	@Override
	public Optional<List<Product>> sltByWM(String WM){
		QProduct qp = QProduct.product;
		return Optional.ofNullable(queryFactory.selectFrom(qp).where(qp.celeb.celebMw.eq(WM)).fetch());
	}
	//샐럽번호따라 조회
	@Override
	public Optional<List<Product>> sltByCelebNo(Long No){
		QProduct qp = QProduct.product;
		return Optional.ofNullable(queryFactory.selectFrom(qp).where(qp.celeb.celebNo.eq(No)).fetch());
	}
	@Override
	public Optional<List<Product>> sltByCelebNM(String NM){
		QProduct qp = QProduct.product;
		return Optional.ofNullable(queryFactory.selectFrom(qp).where(qp.celeb.celebNm.eq(NM)).fetch());
	}
	@Override
	public Optional<List<CardForSalesDTO>> searchCard(String NM){
		QProduct qp = QProduct.product;
		QProduct_Media qpm= QProduct_Media.product_Media;

		return Optional.ofNullable(queryFactory.select(Projections.constructor(
				CardForSalesDTO.class
				, qp.productNo
				, qp.productNm
				, qpm.productMediaAdres
				, qp.productGrade.productGradeNo
				, qp.productGrade.productGrade
				)).from(qp)
				.join(qpm).on(qp.productNo.eq(qpm.product.productNo))
				.where(qp.celeb.celebNm.contains(NM))
				.fetch());
		
	}
}