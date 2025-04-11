package InfoComm.backEnd.controller;
import InfoComm.backEnd.exception.ProduitInformationInvalidException;
import InfoComm.backEnd.model.Produit;
import InfoComm.backEnd.repositories.ProduitRepository;
import InfoComm.backEnd.validation.ProduitValidateur;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(/*origins = "http://localhost:5173"*/)
public class ProduitController {
    @Autowired
    private ProduitRepository produitRepository;
    private ProduitValidateur produitValidateur;

    private Logger logger = LoggerFactory.getLogger(ProduitController.class);


    public ProduitController(ProduitRepository produitRepository, ProduitValidateur produitValidateur) {
        this.produitRepository = produitRepository;
        //TODO implement produitValidateur
        this.produitValidateur = produitValidateur;
    }

    @GetMapping(path = "/produits")
    public Produit getProduits() throws InterruptedException{
        logger.info("Obtention des produits...");

        return produitRepository.findAllByIsDeletedFalse();
    }

    @PostMapping("produits/post")
    public int ajouterProduit(@RequestBody Produit produit) throws ProduitInformationInvalidException {
        logger.info("Ajouter un produit: " + produit.toString());
        int id = -1;
        //TODO lié message à produitValidateur
        String message = "";
        Produit produit1 = produit;
        if(message.equals("")) {
            id = produitRepository.save(produit1).getId();
            logger.info("Nouveau produit entré avec l'id: " + id);
        }
        else {
            throw new ProduitInformationInvalidException(message);
        }
        return id;
    }

    @PatchMapping("produit/delete/{id}")
    public ResponseEntity<Produit> softDeleteProduit(@PathVariable Long id) {
        Optional<Produit> produitOptionnel = Optional.ofNullable(produitRepository.findFirstById(id));
        if(produitOptionnel.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Produit produit = produitOptionnel.get();
        produit.setDeleted(false);
        logger.info("Produit supprimé: " + id);

        return new ResponseEntity<>(produit, HttpStatus.OK);
    }
    @PatchMapping("produit/patch/{id}")
    public ResponseEntity<Produit> updateProduit(@PathVariable Long id, @RequestBody Produit produitPartiel) {
        Optional<Produit> produitOptionnel = Optional.ofNullable(produitRepository.findFirstById(id));
        boolean warn = true;
        if(produitOptionnel.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Produit produit = produitOptionnel.get();
        logger.info("Modification du produit suivant: " + id);

//        if(produitPartiel.getCategorie() != null) {
//            logger.info(produit.getCategorie() + " -> " + produitPartiel.getCategorie());
//            produit.setCategorie(produitPartiel.getCategorie());
//            warn = false;
//        }
//
//        if(produitPartiel.getFabricant() != null) {
//            logger.info(produit.getFabricant() + " -> " + produitPartiel.getFabricant());
//            produit.setFabricant(produitPartiel.getFabricant());
//            warn = false;
//        }

        if(produitPartiel.getModele() != null) {
            logger.info(produit.getModele() + " -> " + produitPartiel.getModele());
            produit.setModele(produitPartiel.getModele());
            warn = false;
        }

        if(!warn) {
            produitRepository.save(produit);
        }
        else {
            logger.warn("Aucune modification n'a été apportée");
        }
        return new ResponseEntity<>(produit, HttpStatus.OK);
    }
}

