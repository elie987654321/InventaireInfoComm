package InfoComm.backEnd.controller;

import InfoComm.backEnd.model.Alerte;
import InfoComm.backEnd.model.Produit;
import InfoComm.backEnd.repositories.AlerteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class AlerteController
{
    @Autowired
    private AlerteRepository alerteRepository;
/*
    @GetMapping(path = "alertes/{id}")
    public ResponseEntity<Produit> getUserAlertes(@PathVariable int id)
    {
        ArrayList<Alerte> userAlertes = alerteRepository.findAllByUtilisateurIdAndIsDeleted(id, false);

        for(int i = 0; i < userAlertes.size(); i++)
        {

        }
    }*/
}
