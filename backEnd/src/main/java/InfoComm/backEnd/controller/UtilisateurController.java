package InfoComm.backEnd.controller;

import InfoComm.backEnd.repositories.UtilisateurRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UtilisateurController {
    @Autowired
    private UtilisateurRepository utilisateurRepository;
    private Logger logger = LoggerFactory.getLogger(UtilisateurController.class);
}
