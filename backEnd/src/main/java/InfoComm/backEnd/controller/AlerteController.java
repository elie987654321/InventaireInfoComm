package InfoComm.backEnd.controller;

import InfoComm.backEnd.classes.AlerteProduit;
import InfoComm.backEnd.model.Alerte;
import InfoComm.backEnd.model.Produit;
import InfoComm.backEnd.repositories.AlerteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class AlerteController
{
    @Autowired
    private AlerteRepository alerteRepository;

    @GetMapping(path = "alertes/{id}")
    public ResponseEntity<List<AlerteProduit>> getUserAlertes(@PathVariable int id)
    {
        ArrayList<Alerte> userAlertes = alerteRepository.findAllByUtilisateurIdAndIsDeleted(id, false);

        List<AlerteProduit> alertesProduit = userAlertes.stream().map(alerte -> {
            AlerteProduit alerteProduit = new AlerteProduit();
            alerteProduit.setAlerte(alerte);
            return alerteProduit;
        }).toList();

        return new ResponseEntity<List<AlerteProduit>>(alertesProduit, HttpStatus.OK);
    }
}
