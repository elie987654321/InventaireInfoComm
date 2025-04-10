package org.example.repositories;

import org.example.model.Produit;
import org.springframework.data.repository.CrudRepository;

public interface ProduitRepository extends CrudRepository<Produit, Long>{
}
