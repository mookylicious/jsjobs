import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { JobService } from './../services/job.service';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'ag-job-add-form',
  templateUrl: './job-add-form.component.html',
  styleUrls: ['./job-add-form.component.css']
})
export class JobAddFormComponent implements OnInit {

  form: FormGroup;
  userIsLoggedIn = false; // flag pour identifier si user est loggé ou pas

  contractTypes = [
    { id: 1, name: 'Stage', value: 'intership' },
    { id: 2, name: 'Interim', value: 'temp' },
    { id: 3, name: 'Contrat à durée déterminée (CDD)', value: 'fixed-term' },
    { id: 4, name: 'Contrat à durée indéterminée (CDI)', value: 'permanent' },
    { id: 5, name: 'Independant', value: 'freelance' }
  ];

  currencies = [
    { id: 1, name: 'euros', value: 'EU', symbol: '€' },
    { id: 2, name: 'livres sterling', value: 'POUNDS', symbol: '£' },
    { id: 3, name: 'francs CFA', value: 'CFA', symbol: 'CFA' },
    { id: 4, name: 'dollars canadien', value: 'CAD', symbol: '$' }
  ];

  statuses = [
    { id: 1, name: 'cadre', value: 'executive' },
    { id: 1, name: 'employé', value: 'employee' }
  ];

  experience = [
    { id: 1, name: 'junior', value: 'junior' },
    { id: 2, name: 'medior', value: 'medior' },
    { id: 3, name: 'senior', value: 'senior' }
  ];

  areas = [
    { id: 1, name: 'aucun déplacements', value: 'none' },
    { id: 2, name: 'déplacements régionaux', value: 'region' },
    { id: 3, name: 'déplacements nationaux', value: 'nation' },
    { id: 4, name: 'déplacements internationaux', value: 'international' }
  ];

  constructor(private formBuilder: FormBuilder, private _jobService: JobService, private _authService: AuthService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: -1,
      title: '',
      company: '',
      city: '',
      zipcode: 35,
      description: '',
      contract: '',
      salary: null,
      currency: '',
      startdate: new Date(),
      experience: '',
      status: '',
      area: '',
      field: '',
      publishdate: new Date(),
      lastupdate: new Date()
    });

    this.checkUserIsLoggedIn(); // vérification à l'intilisation que le user est loggé ou pas
  }

  checkUserIsLoggedIn() {
    if (this._authService.userIsLoggedIn()) {
      this.userIsLoggedIn = true;
    }
  }

  createJob(jobData) {
    // Récupération du token
    const token = JSON.parse(localStorage.getItem('jbb-token')).token;
    // on passe à la méthode addJob les données receuillies du formulaire mais aussi le token
    // cette méthode va ensuite appeler authService pour qu'on lui retourne les RequestOptions
    this._jobService.addJob(jobData, token).subscribe();
    this.form.reset();
  }



}
