package org.example.produit;

import org.example.repositories.ProduitRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(/*origins = "http://localhost:5173"*/)
public class ProduitController {
    @Autowired
    private ProduitRepository produitRepository;

}
