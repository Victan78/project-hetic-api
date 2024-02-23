module.exports = ({ nom,prenom,mail,numéro,competences=[],listedelangageconnue=[], description, premierecouleur, deuxiemecouleur, listeExperience=[]}) => {
    const today = new Date();
    if (competences.length === 0) {
        competences = ['Aucune compétence technique renseignée'];
    }
    if (listedelangageconnue.length === 0) {
        listedelangageconnue = [''];
    }
    if (listeExperience.length === 0) {
        listeExperience = [{ entreprise: '', description: '', dates: '' }];
    }

return `
<!DOCTYPE html>
<html lang="et" >
<head>
  <meta charset="UTF-8">
  <title>CV Printable A4</title>
</head>
<body>
<!-- partial:index.partial.html -->
<html lang="et" >
   <head>
      <title>Curriculum Vitae</title>
      <meta name="viewport" content="width=device-width" />
      <meta name="description" content="Margus Lillemagi - Curriculum Vitae" />
      <meta charset="UTF-8">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <link href='https://fonts.googleapis.com/css?family=Oswald:400,700|Lato:400,300' rel='stylesheet' type='text/css'>
      <!--[if lt IE 9]>
      <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
      <![endif]-->
      <style>
         body {
            background: #202020; 
         }
         page {
         background: rgba(0,0,0,0);
         display: block;
         margin: 0 auto;
         margin-bottom: 5mm;
         margin-top: 5mm;
         }
         page[size="A4"] {  
         width: 100%;
         height: 100%;
         }
         @page {
         size: 100% 100%;
         margin: 0; 
         }
         @media print { /* Print settings */
         html, body, page {
         width: 100%;
         height:100%;
         background: rgba(0,0,0,0);
         margin: 0 !important; 
         padding: 0 !important;
         overflow: hidden; 
         }
         .no-overflow{
         overflow: hidden; 
         }
         #Header, #Footer { 
         display: none !important;
         }
         button {
         display: none;
         }
         size: A4 portrait;
         /* ... the rest of the rules ... */
         }
         html,body,div,span,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,abbr,address,cite,code,del,dfn,em,img,ins,kbd,q,samp,small,strong,sub,sup,var,b,i,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,figcaption,figure,footer,header,hgroup,menu,nav,section,summary,time,mark,audio,video {
         border:0;
         font:inherit;
         font-size:100%;
         margin:0;
         padding:0;
         vertical-align:baseline;
         }
         article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section {
         display:block;
         }
         html, body {font-family: 'Lato', helvetica, arial, sans-serif; font-size: 11pt; color: #222;}
         .clear {clear: both;}
         p {
         line-height: 15pt;
         margin-bottom: 4mm;
         color: #000;
         word-break: break-word;
         }
         a {
            text-decoration: none;
         }
         a:hover { 
            text-decoration:underline;
         }
         a, .fa-check, .fa-arrow-right {
         color: #c2eb1e;
         }
         .cv {
         width: 100%;
         height:100%;
         background: #202020;
         border: 1 mm solid #c2eb1e;
         }
         .mainDetails {
         padding: 8mm 0 0 8mm;
         background: #202020;
         }
         #name {
         float: left;
         text-transform: uppercase;
         padding: 8.5mm 0 0 7mm;
         }
         #name h1 {
         font-size: 33pt;
         font-weight: 400;
         font-family: 'Oswald', Helvetica, Arial, sans-serif;
         line-height: 38pt;
         color:#c2eb1e;
         }
         #name h2 {
         font-size: 18pt;
         font-family: 'Oswald', Helvetica, Arial, sans-serif;
         line-height: 20pt;
         }
         #mainArea, #mainAreaTwo {
         padding: 0 8mm;
         }
         #headshot {
         width: 46mm;
         float: left;
         margin-top:10mm;
         margin-left:-.5mm;
         }
         #headshot img {
         width: 100%;
         height: auto;
         -webkit-border-radius: 50%;
         border-radius: 50%;
         }
         .contactDetails {
         float:right;
         margin:10mm 8mm 0  0;
         float: right;
         }
         .contactDetails ul { 
         list-style-type: none;
         font-family: 'Oswald', Helvetica, Arial, sans-serif;
         }
         .contactDetails ul li {
         line-height: 24pt;
         color: #000;
         }
         .contactDetails ul li a, a[href^=tel] {
         color: #000; 
         padding: 4px 8px;
         text-decoration: none;
       
         }
         .contactDetails ul li a:hover { 
         box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
         color:#c2eb1e;
         }
         .icon {
         font-size: 14pt;
         }
         .bold{
         font-weight:bold;
         }
         section {
         border-top: 1mm dotted #000;
         padding: 4mm 0 0 0;
         }
         section:first-child {
         border-top: 0;
         padding: 8mm 0 0 0;
         }
         section:last-child {
         padding: 4mm 0 0 0;
         }
         .sectionTitle {
         float: left;
         width: 50mm;
         margin-bottom:6mm; 
         }
         .sectionContent {
         float: right;
         width: 141mm;
         }
         .sectionTitle h1 {
         font-family: 'Oswald', Helvetica, Arial, sans-serif;
         font-weight: 400;
         text-transform: uppercase;
         font-size: 18pt;
         color: #c2eb1e;
         }
         .sectionContent h2 {
         font-family: 'Oswald', Helvetica, Arial, sans-serif;
         text-transform: uppercase;
         font-size: 18pt;
         }
         .subDetails {
         font-family: 'Lato', Helvetica, Arial, sans-serif;
         font-size: 11pt;
         font-weight:bold;
         color: #c2eb1e;
         }
         .nameDetails {
         font-size: 11pt;
         font-family: 'Lato', Helvetica, Arial, sans-serif;
         color: #000;
         text-transform: lowercase;
         }
         .keySkills {
         list-style-type: none;
         -moz-column-count:3;
         -webkit-column-count:3;
         column-count:3;
         margin-bottom: 4mm;
         font-size: 11pt;
         color: #000;
         line-height: 15pt;
         }
         .keySkills ul li {
         margin-bottom: 6mm;
         }
         .clients {
         list-style-type: none;
         -moz-column-count:1;
         -webkit-column-count:1;
         column-count:1;
         margin-bottom: 4mm;
         font-size: 11pt;
         color: #000;
         line-height: 15pt;
         text-decoration: none;
         }
         .clients ul li {
         margin-bottom: 6mm;
         }
         .list {
         list-style-type: none;
         -moz-column-count:1;
         -webkit-column-count:1;
         column-count:1;
         margin-bottom: 4mm;
         font-size: 11pt;
         color: #000;
         line-height: 15pt;
         }
         button{
         background-color: black;
         width:245px;
         border:none;
         outline:0;
         color: #202020;
         font-family: 'Oswald', Helvetica, Arial, sans-serif;
         font-size: 20px;
         font-weight:bold;
         padding: 8px 20px;
         text-align: center;
         text-decoration: none;
         display: inline-block;
         margin: 0px 550px;
         cursor: pointer; 
         text-transform:uppercase
         }
       
       
      
      </style>
   </head>
   <body>
    <page size="A4" style="
    background: black;
    ">
        <div class="cv">
            <div id="header">
                <div class="contactDetails">
                    <ul>
                        <li class="icon" title="Envoyer un mail"><a href="mailto:${mail}"><i class="fa fa-envelope">&nbsp;&nbsp;</i>${mail}</a></li>
                        <li class="icon" title="Appeler"><a href="tel:${numéro}"><i class="fa fa-phone" aria-hidden="true"></i>&nbsp;&nbsp;${numéro}</a></li>
                    </ul>
                </div>
            </div>
            <div class="mainDetails">
                <div id="headshot">
                    <img id="avatar" src="https://visualangle.ee/delivery/temp_image/icon.png" alt="${prenom} ${nom}" title="C'est moi" />
                </div>
                <div id="name">
                    <h1>${prenom}</br>${nom}<span class="nameDetails">&nbsp;&nbsp;${today.getDate()}. ${today.toLocaleString('et', { month: 'long' })} ${today.getFullYear()}</span></h1>
                </div>
                <div class="clear"></div>
            </div>
            <div id="mainArea">
                <section>
                    <article>
                        <div class="sectionTitle">
                            <h1>Profil</h1>
                        </div>
                        <div class="sectionContent">
                            <p>${description}</p>
                        </div>
                    </article>
                    <div class="clear"></div>
                </section>
                <section>
                    <div class="sectionTitle">
                        <h1>Outils Maitrisée</h1>
                    </div>
                    <div class="sectionContent">
                        <ul class="keySkills">
                            <li class="subDetails">Skills</li>
                            ${competences.map(langage => `<li><i class="fa fa-check" aria-hidden="true"></i>&nbsp;${langage}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="clear"></div>
                </section>
                <section>
                    <div class="sectionTitle">
                        <h1>Portfolio</h1>
                    </div>
                    <div class="sectionContent">
                        <ul class="clients">
                            <li title="Voir mon code sur CodePen"><a href="https://codepen.io" target="_blank">codepen.io</a></li>
                            <li title="Suivre ma page Facebook"><a href="https://www.facebook.com" target="_blank">facebook.com</a></li>
                        </ul>
                    </div>
                    <div class="clear"></div>
                </section>
                <section>
                    <div class="sectionTitle">
                        <h1>EXP</h1>
                    </div>
                    <div class="sectionContent">
                        <ul class="list">
                            ${listeExperience.map(exp => `<li><span class="subDetails">${exp.dates}&nbsp;&nbsp;</span><span class="bold">${exp.entreprise}</span> - ${exp.description}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="clear"></div>
                </section>
                <section>
                    <div class="sectionTitle">
                        <h1>Etudes</h1>
                    </div>
                    <div class="sectionContent">
                        <ul class="list">
                            <li><span class="subDetails">2017-2019&nbsp;&nbsp;</span>Maîtrise en informatique - Université ABC</li>
                            <li><span class="subDetails">2001-2002&nbsp;&nbsp;</span>Baccalauréat en génie logiciel - Université XYZ</li>
                            
                        </ul>
                    </div>
                    <div class="clear"></div>
                </section>
                <section>
                    <div class="sectionTitle">
                        <h1>Langues Maitrisées</h1>
                    </div>
                    <div class="sectionContent">
                        <ul class="list">
                            ${listedelangageconnue.map(langage => `<li><i class="fa fa-check" aria-hidden="true"></i>&nbsp;${langage}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="clear"></div>
                </section>
            </div>
        </div>
    </page>
</body>
<html>  


    `;
};