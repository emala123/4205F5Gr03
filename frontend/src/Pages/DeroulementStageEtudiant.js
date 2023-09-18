import "./DeroulementStageEtudiant.css";

function DeroulementStageEtudiant() {
  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <h2>Édition - Directives pour les étudiants</h2>
      <h4>
        Tâches à effectuer par l'étudiant à la session d'automne (c'est-à-dire
        maintenant):
      </h4>
      <p className="text">
        {" "}
        En format "Word" ou en format PDF que vous allez remettre sur Moodle
        pour le cours "2018-2019 : Stages de fin d'études en informatique". Vous
        devez remettre un seul fichier .ZIP (pas d'autre format accepté) nommé
        NomFamillePrenom.ZIP (pas d'espace, ni d'accent dans le nom du fichier)
      </p>

      <p className="text">
        Contacter les employeurs pour leur proposer vos services
      </p>
      <p className="text">
        Pour chaque employeur que vous contactez vous devez inscrire ses
        coordonnées sur le formulaire{" "}
      </p>
      <a href="../documents/contact_employeurs.docx">Fichier en format Word</a>

      <p className="text">
        Lorsque vous rencontrez un employeur (entrevue) vous devez remplir le
        formulaire:{" "}
      </p>
      <a href="../documents/rencontre_employeur.pdf">
        &laquo;rencontre&nbsp;employeur&raquo;
      </a>

      <p className="text">
        Vous devez rencontrer au moins trois (3) employeurs, à moins bien sûr
        que vous ayez trouvé votre stage avant. Vous devriez avoir au moins
        trois formulaires &laquo;rencontre&raquo;, un par employeur rencontré.
      </p>

      <p className="text">
        Plus de détails pour les
        <a href="rapports_techniques.php">rapports techniques</a>
      </p>
      <ul>
        <li>
          TRÈS IMPORTANT: pour toute communication par courriel avec le
          coordonnateur vous devez inscrire dans le sujet du message:
        </li>
        <li class="retrait petit">SUJET: Stages profil #DA nom - raison</li>
        <li class="retrait petit">profil est soit réseaux, soit prog</li>
        <li class="retrait petit">#DA est votre numéro d'admission</li>
        <li class="retrait petit">nom est votre nom</li>
        <li class="retrait petit">
          par exemple: Stages réseaux 201014109 Joe Larue - contenu CV
        </li>
        <li>N'oubliez pas d'inscrire la raison du message (après le tiret).</li>
        <li>
          Si ces conditions ne sont pas respectées, j'ignorerai le courriel et
          je ne répondrai pas.
        </li>
      </ul>

      <p className="text">
        {" "}
        Déroulement des stages / Horaire de travail Les stages ont lieu durant
        la session d'hiver. Ils sont d'une durée de 15 semaines, du x janvier au
        y mai 2024. Vous trouverez les détails dans la section "Les profils du
        programme informatique, les dates et les spécificités des stages".
      </p>

      <p className="text">
        Pendant les journées pédagogiques et les journées de rattrapage
        (lecture) identifiées sur le calendrier scolaire, le stagiaire est tenu
        d'être présent en milieu de stage. Il est possible de débuter le stage
        plus tôt (que la date prévue) après entente entre l'étudiant, le
        coordonnateur et l'employeur (un stage ne peut débuter plus tôt que le
        premier lundi de janvier de l'année du stage)
      </p>

      <p className="text">
        Il y aura deux rencontres obligatoires en ligne Vendredi 12h00-13h00 en
        janvier avant le début des stages. Vendredi 12h00-13h00 vers le milieu
        du stage (la date sera communiquée plus tard).
      </p>
      <p className="text">
        Les étudiants doivent remettre un rapport hebdomadaire décrivant leurs
        tâches de la semaine au plus tard le lundi suivant avant 11h00 AM (il
        est suggéré de remettre ce rapport le vendredi en fin d'après-midi en
        terminant la semaine). Ce rapport est envoyé par courriel au professeur
        superviseur. Le format du rapport sera discuté avec le professeur
        superviseur de l'étudiant.
      </p>
      <p className="text">
        Le professeur superviseur contactera l'étudiant (selon l'horaire
        préalablement établit avec l'étudiant) à chaque semaine. Le
        professeur-superviseur rencontre les étudiants à chaque deux semaines (à
        moins d'une entente particulière avec le superviseur de l'entreprise).
      </p>
      <p className="text">
        À la fin des stages (habituellement dans la semaine d'évaluation, une à
        deux semaines après les stages), les stagiaires seront appellés à
        présenter leurs projets de fin d'études aux professeurs et aux autres
        stagiaires. Les superviseurs en entreprise sont les bienvenus à ces
        présentations (les personnes intéressées devraient convenir de l'horaire
        avec le professeur-superviseur).
      </p>
    </div>
  );
}

export default DeroulementStageEtudiant;
