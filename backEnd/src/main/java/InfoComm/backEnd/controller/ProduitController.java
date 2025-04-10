package InfoComm.backEnd.controller;
import InfoComm.backEnd.model.Produit;
import InfoComm.backEnd.repositories.ProduitRepository;
import InfoComm.backEnd.validation.ProduitValidateur;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.List;


@RestController
@CrossOrigin(/*origins = "http://localhost:5173"*/)
public class ProduitController {
    @Autowired
    private ProduitRepository produitRepository;

    private Logger logger = LoggerFactory.getLogger(ProduitController.class);


    public ProduitController(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
        //this.produitValidateur = produitValidateur;
    }

    @GetMapping(path = "/produits", produces = {"application/json"})
    public Iterable<Produit> getProduits() throws InterruptedException{
        logger.info("Obtention des produits...");



        return produitRepository.findAll();
    }
}

