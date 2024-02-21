import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/form.css';
import { useUserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { uploadFile } from '../../firebase.config';
import PdfViewer from './pdfviweer';
import Loader from './loader';
const CVForm = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [mail, setMail] = useState('');
    const [numéro, setNuméro] = useState('');
    const [description, setDescription] = useState('');
    const [competences, setCompetences] = useState([]);
    const [autreCompetence, setAutreCompetence] = useState('');
    const [experiences, setExperiences] = useState([]);
    const [nouvelleExperience, setNouvelleExperience] = useState({ entreprise: '', dates: '', description: '' });
    const { user } = useUserContext();
    const [pdfUrl, setPdfUrl] = useState('');
    const navigate = useNavigate();
    const [cacher,voir] = useState(false)
    const [loading, setLoading] = useState(false);

    
  
    const handleCompetenceChange = (competence) => {
      if (competences.includes(competence)) {
        setCompetences(competences.filter((c) => c !== competence));
      } else {
        setCompetences([...competences, competence]);
      }
    };
  
    const handleAddExperience = () => {
        if (!nouvelleExperience.entreprise || !nouvelleExperience.dates || !nouvelleExperience.description) {
          alert('Veuillez remplir tous les champs de la nouvelle expérience');
          return;
        }
      // Ajoutez la nouvelle expérience à la liste des expériences sil ny a pas dexpérience dans la liste
        if (experiences.length === 0) {
          setExperiences([nouvelleExperience]);
        } else {
            setExperiences([...experiences, nouvelleExperience]);
            }
        // Réinitialisez la nouvelle expérience
        setNouvelleExperience({ entreprise: '', dates: '', description: '' });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
        setLoading(true);
  
      const formData = {
        nom,
        prenom,
        mail,
        numéro,
        description,
        competences,
        autreCompetence,
        listeExperience: experiences,
      };
  
      axios.post('http://localhost:5000/create-cv', formData)
        .then(() => axios.get('http://localhost:5000/fetch-cv', { responseType: 'blob' }))
        .then((res) => {
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
            setPdfUrl(URL.createObjectURL(pdfBlob));
            setLoading(false);
            voir(true)

            uploadFile(pdfBlob).then((url) => {
                console.log('File available at', url);
               
              
              });
        
            
        })
        .catch((error) => {
            setLoading(false)
          console.error('Erreur lors de la création ou de la récupération du fichier PDF:', error);
          // Gérez l'erreur côté client
        });
    };

    useEffect(() => {
        if (!user) {
          navigate('/login');
        }
      }, [user, navigate]);

  return (

    user ? (
    <>
    {
        loading && (
            <Loader />
        )
    }
  
    <div className='container_creation' >
        <div className='Formulaire'>

       
      <h2>Formulaire de CV</h2>
      <form onSubmit={handleSubmit}>
        <div>
                <label>
            
            <input type="text" name='name' value={nom} onChange={(e) => setNom(e.target.value)} placeholder='Nom' />
            </label>
            
            <label>
            
            <input type="text" name='name' value={prenom} onChange={(e) => setPrenom(e.target.value)} placeholder='Prenom' />
            </label>
            
            <label>
            
            <input type="email" name='email' value={mail} onChange={(e) => setMail(e.target.value)} placeholder='Email' />
            </label>
            
            <label>
            
            <input type="tel" name='telephone' value={numéro} onChange={(e) => setNuméro(e.target.value)}  placeholder='Numéro de téléphone'/>
            </label>
            
            <label>
            
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={500} placeholder='Faite une description de vous et de ce que vous recherchier' />
            </label>
        </div>
        <div>
        <label>
          Expériences professionnelles:
          {experiences.map((exp, index) => (
            <div  key={index} className="experience">
              <p>{exp.entreprise}</p>
              <p>{exp.dates}</p>
              <p>{exp.description}</p>
            </div>
          ))}
          <div className="nouvelle-experience">
            <input
              type="text"
              value={nouvelleExperience.entreprise}
              onChange={(e) => setNouvelleExperience({ ...nouvelleExperience, entreprise: e.target.value })}
              placeholder="Entreprise"
            />
            <input
              type="text"
              value={nouvelleExperience.dates}
              onChange={(e) => setNouvelleExperience({ ...nouvelleExperience, dates: e.target.value })}
              placeholder="Dates"
            />
            <input
              type="text"
              value={nouvelleExperience.description}
              onChange={(e) => setNouvelleExperience({ ...nouvelleExperience, description: e.target.value })}
              placeholder="Description"
            />
            <button type="button" onClick={handleAddExperience}>Ajouter expérience</button>
          </div>
        </label>

        <label >
          Compétences:
          <div style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
           
        }}>
            <li>
              <label className="label_check">
                <input
                  type="checkbox"
                  value="HTML"
                  checked={competences.includes('HTML')}
                  onChange={() => handleCompetenceChange('HTML')}
                />
                <div class="checkmark"></div>
               
                HTML
              </label>
            </li>
            <li>
              <label className="label_check">
                <input
                  type="checkbox"
                  value="CSS"
                  checked={competences.includes('CSS')}
                  onChange={() => handleCompetenceChange('CSS')}
                />
                <div class="checkmark"></div>
                CSS
              </label>
            </li>
            <li>
              <label className="label_check">
                <input
                  type="checkbox"
                  value="PYTHON"
                  checked={competences.includes('PYTHON')}
                  onChange={() => handleCompetenceChange('PYTHON')}
                />
                <div class="checkmark"></div>
                PYTHON
              </label>
            </li>
            <li>
              <label className="label_check">
                <input
                  type="checkbox"
                  value="JAVA"
                  checked={competences.includes('JAVA')}
                  onChange={() => handleCompetenceChange('JAVA')}
                />
                <div class="checkmark"></div>
                JAVA
              </label>
            </li>
            <li>
              <label className="label_check">
                <input
                  type="checkbox"
                  value="SQL"
                  checked={competences.includes('SQL')}
                  onChange={() => handleCompetenceChange('SQL')}
                />
                <div class="checkmark"></div>
                SQL
              </label>
            </li>
            <li>
              <label className="label_check">
                <input
                  type="checkbox"
                  value="VUE JS"
                  checked={competences.includes('VUE JS')}
                  onChange={() => handleCompetenceChange('VUE JS')}
                />
                <div class="checkmark"></div>
                VUE JS
              </label>
            </li>
            {/* Ajoutez d'autres compétences de la même manière */}
            <li>
              <label className="label_check">
                <input
                  type="checkbox"
                  value="Autre"
                  checked={competences.includes('Autre')}
                  onChange={() => handleCompetenceChange('Autre')}
                />
                <div class="checkmark"></div>
                Autre
                {competences.includes('Autre') && (
                  <input
                    type="text"
                    value={autreCompetence}
                    onChange={(e) => setAutreCompetence(e.target.value)}
                    placeholder="Précisez"
                  />
                )}
              </label>
            </li>
          </div>
        </label>
        
        </div>
        
    
       
       
        <button type="submit" className='magic_button'>Génerer par magie</button>
      </form>
      </div>
{pdfUrl !== '' && (
         <button className='voir_btn' onClick={
        () => {
            voir(!cacher)
        }
    }>voir le cv</button>)}
  
    </div>
 
  
    <div>

    {
    cacher && pdfUrl !== '' && (
        <div className="backgroundblack"
      
        ><div className="onclickclose" onClick={
            () => {
                voir(!cacher)
            }
        
        }></div> <PdfViewer pdfUrl={pdfUrl} /></div>
       
    )
   }
   
    </div>
    
  
   
    </>

    ) :(
        <></>
    )
  );
};

export default CVForm;
