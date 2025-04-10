package org.example.controller;

import org.example.model.Produit;
import org.example.repositories.ProduitRepository;
import org.example.validation.ProduitValidateur;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Comparator;
import java.util.List;


@RestController
@CrossOrigin(/*origins = "http://localhost:5173"*/)
public class ProduitController {
    @Autowired
    private ProduitRepository produitRepository;
    private ProduitValidateur produitValidateur;

    private Logger logger = LoggerFactory.getLogger(ProduitController.class);


    public ProduitController(ProduitRepository produitRepository, ProduitValidateur produitValidateur) {
        this.produitRepository = produitRepository;
        this.produitValidateur = produitValidateur;
    }

    @GetMapping
    public Collection<Produit> getProduits() throws InterruptedException{
        logger.info("Obtention des produits...");
        Thread.sleep(0);
        List<Produit> produits = (List<Produit>) produitRepository.findAll();

        return produits;
    }
}

