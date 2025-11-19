import React, { useState } from "react";

// Küsimused ja vastused
const questions = [
  {
    id: 1,
    text: "Sinu perearstikabineti ooteruum on rahvast täis…",
    dimension: "EI",
    options: {
      A: {
        text: "Mulle isegi meeldib – iga patsient on uus väike kohtumine ja energialaeng.",
        letter: "E",
        image: "/answers/q1-a.jpg",
      },
      B: {
        text: "Tõmban sügavalt hinge ja keskendun: lähen ükshaaval süvitsi, mitte show'd tegema.",
        letter: "I",
        image: "/answers/q1-b.jpg",
      },
    },
  },
  {
    id: 2,
    text: "Pärast pikka vastuvõtupäeva…",
    dimension: "EI",
    options: {
      A: {
        text: "Olen küll väsinud, aga patsientidega suhtlus annab pigem energiat.",
        letter: "E",
        image: "/answers/q2-a.jpg",
      },
      B: {
        text: "Tunnen, et mul on sotsiaalne aku tühi ja vajan vaikust, et taastuda.",
        letter: "I",
        image: "/answers/q2-b.jpg",
      },
    },
  },
  {
    id: 3,
    text: "Krooniline patsient, kellel on sada analüüsi ja pikk haiguslugu:",
    dimension: "SN",
    options: {
      A: {
        text: "Alustan konkreetsetest numbritest, varasematest diagnoosidest ja ravijuhendist.",
        letter: "S",
        image: "/answers/q3-a.jpg",
      },
      B: {
        text: "Püüan esmalt aru saada tema elust ja suurest pildist – töö, pere, harjumused –, siis sobitan sinna meditsiini.",
        letter: "N",
        image: "/answers/q3-b.jpg",
      },
    },
  },
  {
    id: 4,
    text: "Ilmub uus perearsti ravijuhend:",
    dimension: "SN",
    options: {
      A: {
        text: "Tõmban alla ja loen läbi: annused, samm-sammulised algoritmid, tabelid.",
        letter: "S",
        image: "/answers/q4-a.jpg",
      },
      B: {
        text: "Uurin pigem, kuidas see juhend mõtteviisi muudab ja millist tuleviku perearsti see eeldab.",
        letter: "N",
        image: "/answers/q4-b.jpg",
      },
    },
  },
  {
    id: 5,
    text: "Patsient nõuab antibiootikumi, kuigi kliiniliselt pole vajadust:",
    dimension: "TF",
    options: {
      A: {
        text: "Selgitan rahulikult faktid, riskid ja miks antibiootikum ei ole näidustatud – isegi kui ta selle peale mossi läheb.",
        letter: "T",
        image: "/answers/q5-a.jpg",
      },
      B: {
        text: "Püüan kõigepealt tema hirmu mõista ja siis selgitada, miks teeme teisiti.",
        letter: "F",
        image: "/answers/q5-b.jpg",
      },
    },
  },
  {
    id: 6,
    text: "Eakas patsient tuleb ilmselgelt üksindust kurtma, mitte ainult vererõhku mõõtma:",
    dimension: "TF",
    options: {
      A: {
        text: "Hoian siiski ajaraamist kinni – saan tema mure ära kuulata, aga pean päevaplaani hoidma.",
        letter: "T",
        image: "/answers/q6-a.jpg",
      },
      B: {
        text: "Lasen tal natuke kauem rääkida ja otsin võimalusi, kuidas ta sotsiaalset tuge suurendada, isegi kui graafik natuke nihkuma hakkab.",
        letter: "F",
        image: "/answers/q6-b.jpg",
      },
    },
  },
  {
    id: 7,
    text: "Kuidas sa oma perearstikeskuse päeva planeeriksid?",
    dimension: "JP",
    options: {
      A: {
        text: "Mulle meeldib selge päevakava – kindlad ajad kroonilistele, kiireloomulistele, e-konsultatsioonidele, tiimikoosolekule.",
        letter: "J",
        image: "/answers/q7-a.jpg",
      },
      B: {
        text: "Jätan päevakavasse hingamisruumi, kuhu saab vajadusel lisada kiireloomulisi juhtumeid või pikemaid vestlusi.",
        letter: "P",
        image: "/answers/q7-b.jpg",
      },
    },
  },
  {
    id: 8,
    text: "Ootamatud patsiendid ja lakkamatud kõned toovad ootamatult palju pöördumisi:",
    dimension: "JP",
    options: {
      A: {
        text: "Loome konkreetse protsessi: kes mida triažeerib, mis on vastamise tähtajad, selged reeglid.",
        letter: "J",
        image: "/answers/q8-a.jpg",
      },
      B: {
        text: "Proovin esmalt paindlikult kohaneda: vaatan, mis päriselt töötab, ja timmin süsteemi jooksvalt.",
        letter: "P",
        image: "/answers/q8-b.jpg",
      },
    },
  },
];

// MBTI tüüpide kaardistus perearsti arhetüüpideks
const typeMap = {
  ISTJ: {
    title: "Süsteemi Arhitekt",
    subtitle: "Struktureeritud ja põhjalik perearst",
    description:
      "Sa hoiad perearstikeskuse töövoo, protsessid ja kvaliteedi joone peal – sinu jaoks on oluline, et asjad oleksid tehtud õigesti ja samamoodi ka homme. Sul on hea mälu detailide ja juhiste osas ning patsient saab sinu juures süsteemset, järjepidevat ravi. Oled sageli see, kes märkab dokumentatsioonis, ravimite koostoimetes või jälgimisplaanis pisikesi auke. Jälgi, et perfektsuse taotlus ei võtaks sinult paindlikkust – vahel vajab patsient rohkem inimest, mitte ideaalset tabelit.",
    image: "/result/ISTJ.png",
  },
  ISFJ: {
    title: "Kogukonna Kangelane",
    subtitle: "Turvaline ja hooliv perearst",
    description:
      "Sa tunned oma patsientide lugusid, hoiad pikemaid suhteid ja oled sageli pere usaldusisik mitme põlvkonna ulatuses. Sa märkad väikeseid muutusi inimeste käitumises ja olekus, mis teistel jäävad märkamata. Patsiendid tulevad sinu juurde, sest tunnevad, et sa tõesti hoolid nendest kui inimesest, mitte ainult diagnoosist. Jälgi, et sa ei võtaks liiga palju teiste muresid endaga koju kaasa – ka hoolival perearstil on vaja teadlikult enda energia ja piiride eest hoolitseda.",
    image: "/result/ISFJ.png",
  },
  INFJ: {
    title: "Zen-Empaatiline Perearst",
    subtitle: "Sügav kuulaja ja märgaja",
    description:
      "Sa tabad varjatud muresid, kuulad rahulikult ja toetad eriti hästi vaimse tervise ning elukriiside korral. Sul on võime näha inimese lugu laiemalt – kuidas tervis, suhted, töö ja väärtused omavahel seotud on. Patsient võib sinu juures esimest korda tunda, et keegi paneb tema killud tervikuks. Samas võid ise kergesti üle koormatud saada, kui proovida kõiki „päästa“ – sinu tugevus tuleb paremini esile siis, kui jagad vastutust meeskonnaga ega unusta ka enda vajadusi.",
    image: "/result/INFJ.png",
  },
  INTJ: {
    title: "Diagnostika Detektiiv",
    subtitle: "Strateegiline probleemilahendaja",
    description:
      "Sind käivitavad keerukad juhud ja süsteemsed lahendused – sa tahad aru saada, miks midagi juhtub, mitte ainult sümptomeid leevendada. Oskad kiiresti eristada olulist müra taustast ja luua loogilise diagnoosimudeli. Samal ajal näed ka suurt pilti: millised muutused teeksid kogu perearstisüsteemi mõistlikumaks ja tõhusamaks. Pane tähele, et sinu otsekohene loogika ei kõlaks patsiendi jaoks külmalt – vahel on vaja esmalt turvatunnet, alles siis geniaalset plaani.",
    image: "/result/INTJ.png",
  },
  ISTP: {
    title: "Diagnostika Detektiiv",
    subtitle: "Rahulik analüütik",
    description:
      "Sa süvened faktidesse, võrdled mustreid ja leiad sageli üles just selle haruldase diagnoosi, mis teistel märkamata jääb. Oled eriti tugev olukordades, kus on vaja kiiret, aga selget otsust – näiteks ägedate seisundite käsitlemisel või protseduuride tegemisel. Sind hinnatakse, sest sa ei paanitse ja jääd ka pingelises olukorras ratsionaalseks. Suhte poolel võib sul vahel jääda mõni tunne märkamata – kui teadlikult kuulad ka seda, mis sõnade vahele jääb, suureneb patsientide usaldus veelgi.",
    image: "/result/ISTP.png",
  },
  ISFP: {
    title: "Zen-Empaatiline Perearst",
    subtitle: "Vaikne, kuid väga hoidev",
    description:
      "Sa ei vaja rambivalgust – sinu tugevus on soe kohalolu, rahulik selgitamine ja patsiendi jaoks olemas olemine. Inimesed tajuvad, et sinu juures võib olla „päriselt tema ise“, ilma et peaks mängima tubli patsiendi rolli. Sageli oled hea valik keeruliste elusituatsioonide, kroonilise valu või palliatiivsete teemade puhul, sest sul on loomulik empaatia. Vahel võid aga vältida konflikti või ebamugavaid vestlusi, et mitte kedagi haavata – teadlik „jah“ ja „ei“ ütlemine aitab kaitsta ka sinu enda energiat.",
    image: "/result/ISFP.png",
  },
  INFP: {
    title: "Zen-Empaatiline Perearst",
    subtitle: "Ideaalist kantud hoolija",
    description:
      "Sa tahad, et patsiendil päriselt parem oleks – mitte ainult numbrites, vaid ka elukvaliteedis ja enesetundes. Sageli näed inimest kui tervikut ja otsid lahendusi, mis sobiksid tema väärtuste ja elustiiliga. Võid olla eriti hea noorte, tundlike või „süsteemikartlike“ patsientidega, sest sinu juures ei pea mängima tugevat. Samas võib ideaalne lahendus jääda mõnikord reaalsusega kokku põrkama – kui lubad endale ka väikeseid praktilisi kompromisse, on sul lihtsam oma põhimõtteid pikaajaliselt hoida.",
    image: "/result/INFP.png",
  },
  INTP: {
    title: "Diagnostika Detektiiv",
    subtitle: "Uudishimulik mõttelabor",
    description:
      "Sa naudid diagnostilisi mõistatusi ja tõenduspõhisust – sinu peas elab väike teadlane, kes alati küsib „miks“. Võid olla see perearst, kelle juurde saadetakse „müstilised“ juhud, millele keegi teine lahendust ei leia. Sul on tugev analüütiline mõtlemine ja oskus meditsiiniuuringuid kriitiliselt lugeda. Patsiendiga suhtluses tasub aga jälgida, et seletus ei muutuks liiga abstraktseks – kui lisad keerulisele loogikale ka lihtsa metafoori või näite, jõuab sinu geniaalne analüüs patsiendini palju paremini.",
    image: "/result/INTP.png",
  },
  ESTP: {
    title: "Kiirreageerija ja Multitaskija",
    subtitle: "Ägedate juhtude lemmik",
    description:
      "Sa oled omas elemendis siis, kui päev on tihe ja ettearvamatu – keeruline triaaž, ootamatud olukorrad ja kiire otsustamine sobivad sulle. Patsiendid tajuvad sind tihti „tegutseja“ tüüpi arstina, kes ei jää liiga kauaks mõtlema, kui on vaja abi. Sa õpid hästi kogemusest ja praktilisest tööst ning sul on loomulik julgus võtta vastutust. Samas võib rutiinne dokumentatsioon ja detailne järelkontroll tunduda tüütuna – kui lood endale lihtsad rutiinid ja tiimi toe paberitöö jaoks, saab sinu tugevus veel paremini särada.",
    image: "/result/ESTP.png", 
  },
  ESFP: {
    title: "Kiirreageerija ja Multitaskija",
    subtitle: "Särav suhtleja",
    description:
      "Patsiendiga kontakti loomine on sinu supervõime – inimesed avanevad sulle kiiresti ja räägivad ka teemadest, mis muidu jääksid varju. Sa tood kabinetti soojust, huumorit ja inimlikkust ning oskad pingelisi olukordi pehmendada. Eriti hästi sobid sa olukordadesse, kus on vaja hirmu vähendada – olgu selleks protseduurid, vaktsineerimised või keerulised diagnoosid. Samas võib pikem, struktureeritud tööplaan tunduda piiravana – kui võtad teadlikult aega ka dokumenteerimiseks ja järeltegevuste fikseerimiseks, toetab see sinu loomulikku annet veelgi.",
    image: "/result/ESFP.png",
  },
  ENFP: {
    title: "Kiirreageerija ja Multitaskija",
    subtitle: "Loov ja energiline perearst",
    description:
      "Sa näed inimest tervikuna ja leiad sageli loovaid, elustiilikeskseid lahendusi – näiteks kuidas siduda ravi patsiendi hobide ja igapäevaeluga. Sul on palju ideid, kuidas perearstisüsteemi inimlikumaks ja paindlikumaks muuta, ning sa sütitad oma energiaga nii kolleege kui patsiente. Oled eriti hea muutuste käivitaja: patsiendid tunnevad, et sinu juures on tõesti võimalik oma harjumusi muuta. Väljakutseks võib olla järjepidevus ja rutiin – kui sead endale lihtsad struktuurid, mis aitavad lubadusi jälgida, saad oma loovust kasutada ilma läbipõlemata.",
    image: "/result/ENFP.png",
  },
  ENTP: {
    title: "Kiirreageerija ja Multitaskija",
    subtitle: "Debattivõimeline ideegeneraator",
    description:
      "Sa armastad arutada uusi raviviise, digiideid ja süsteemimuudatusi ning näed kiiresti, kuidas süsteemi nutikamaks teha. Patsientidele tood sa värskeid vaatenurki olukordadele, mis on neile endale tundunud ummikuna. Oled hea argumenteerija ja suudad keerulised valikud lahti rääkida nii, et inimene saab otsustamises päriselt kaasa mõelda. Samas tasub jälgida, et sinu vaimne tempo ei jätaks aeglasema tempoga patsiente maha – kui aeglustad selgituse lõpus tempo ja küsid, mida nemad kuulsid, saad oma tugevust veel paremini rakendada.",
    image: "/result/ENTP.png",
  },
  ESTJ: {
    title: "Süsteemi Arhitekt",
    subtitle: "Korras süsteem, parem ravi",
    description:
      "Sa usud, et hea meditsiin vajab häid protsesse – järjekorrad, rollid ja vastutus peavad olema selged. Tänu sinule jookseb perearstikeskus nagu hästi õlitatud masin ja patsiendid teavad, mida millal oodata. Oled hea otsustaja ja ei karda võtta vastutust, kui olukord nõuab kiiret tegutsemist. Võid aga vahel tunda frustratsiooni, kui teised ei pea reeglitest kinni või liiguvad aeglasemalt – teadlik pehmus ja huumor aitavad sul oma loomulikku juhtimispotentsiaali kasutada nii, et tiim tunneb end kaasatuna, mitte kamandatuna.",
    image: "/result/ESTJ.png",
  },
  ESFJ: {
    title: "Kogukonna Kangelane",
    subtitle: "Perearst, keda kõik teavad nimepidi",
    description:
      "Sa oled inimeste inimene – patsient tunneb, et on oodatud ja hoitud, ning sina märkad, kui keegi jääb kõrvale. Sul on loomulik oskus hoida häid suhteid nii patsientide, õdede kui kolleegidega, mis teeb sinust sageli perearstikeskuse sotsiaalse südamiku. Oled tugev tervisekäitumise mõjutaja: sinu julgustus ja positiivne surve aitavad inimestel reaalselt oma harjumusi muuta. Samas võib sul olla raske „ei“ öelda või ebapopulaarseid otsuseid kommunikeerida – kui õpid end selle juures mitte süüdistama, püsib sinu hoolimine tervena.",
    image: "/result/ESFJ.png",
  },
  ENFJ: {
    title: "Kogukonna Kangelane",
    subtitle: "Inspireeriv perearst",
    description:
      "Sa suudad patsiente motiveerida muutustele – olgu see suitsetamisest loobumine, liikumisharjumuse leidmine või teraapiasse minek. Sul on hea vaist, kuidas inimest kõnetada just talle sobivas keeles, ning sa näed kiiresti, mis teda tegelikult edasi aitaks. Sageli tõmbad ligi ka keerulisemate lugudega inimesi, sest sinuga on turvaline. Oht peitub selles, et võid võtta vastutust rohkem, kui tervislik on – kui õpid delegeerima, säilib sinu võime inspireerida pikalt ja ilma läbipõlemiseta.",
    image: "/result/ENFJ.png",
  },
  ENTJ: {
    title: "Süsteemi Arhitekt",
    subtitle: "Visiooniga juht-perearst",
    description:
      "Sa tahad lisaks patsientide ravile muuta ka süsteemi – näed, kuidas perearstikeskus, piirkonna tervishoid või digilahendused võiksid töötada palju paremini. Oled loomulik projektide käivitaja ja tiimijuht, kes suudab suure pildi tükkideks jagada ja need ka ellu viia. Patsiendi tasandil väljendub see selgete plaanidena ja konkreetse juhendusena, mis annab turvatunde. Väljakutse võib olla kannatlikkus nende suhtes, kes ei liigu sama kiiresti – kui võtad teadlikult aega ka kuulamiseks ja tausta mõistmiseks, saad oma tugevat visiooni veel tõhusamalt ellu viia.",
    image: "/result/ENTJ.png",
  },
};


function calculateMbti(answers) {
  // Loeme iga tähe esinemise
  const letterCounts = {};

  questions.forEach((q) => {
    const choice = answers[q.id];
    if (!choice) return;
    const option = q.options[choice];
    const letter = option.letter;
    letterCounts[letter] = (letterCounts[letter] || 0) + 1;
  });

  const pickFromPair = (a, b) => {
    const countA = letterCounts[a] || 0;
    const countB = letterCounts[b] || 0;
    if (countA > countB) return a;
    if (countB > countA) return b;
    // viigi korral eelistame esimest tähte, lihtsalt järjepidevuse huvides
    return a;
  };

  const mbti =
    pickFromPair("E", "I") +
    pickFromPair("S", "N") +
    pickFromPair("T", "F") +
    pickFromPair("J", "P");

  return { mbti, letterCounts };
}

function buildEmailBody(name, result, summary) {
  const greeting = name ? `Tere, ${name}!` : "Tere!";

  const summaryLines = summary
    .map((item, idx) => {
      return `${idx + 1}. ${item.question}\n   Sinu vastus: ${item.answerLetter}) ${item.answerText} [${item.letter}]`;
    })
    .join("\n\n");

  return (
    `${greeting}\n\n` +
    `Siin on sinu tulemused mängust \"Milline perearst sina oled?\":\n\n` +
    `Tüüp: ${result.title} (${result.mbti})\n` +
    (result.subtitle ? `${result.subtitle}\n\n` : "\n") +
    `${result.description}\n\n` +
    `Küsimuste ja vastuste ülevaade:\n\n${summaryLines}\n\n` +
    `Tervitustega\n` +
    `Konverentsi korraldajad`
  );
}

const Card = ({ children }) => (
  <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur shadow-xl rounded-2xl p-6 md:p-8 border border-brand-light/40">
    {children}
  </div>
);

const ProgressBar = ({ current, total }) => {
  const percentage = Math.round(((current + 1) / total) * 100);
  return (
    <div className="mb-6">
      <div className="flex justify-between text-xs md:text-sm text-slate-600 mb-1">
        <span>
          Küsimus {current + 1} / {total}
        </span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-dark transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default function PerearstiTyypQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [questionId]: "A" | "B" }
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState(null);
  const [summary, setSummary] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState(null);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (choice) => {
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: choice,
    };
    setAnswers(updatedAnswers);

    const isLast = currentIndex === questions.length - 1;
    if (isLast) {
      finishQuiz(updatedAnswers);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const finishQuiz = (finalAnswers) => {
    const { mbti } = calculateMbti(finalAnswers);
    const typeInfo = typeMap[mbti] || {
      title: "Mitmekülgne perearst",
      subtitle: "Unikaalne kombinatsioon",
      description:
        "Sinu vastused ei mahu ühte kindlasse kasti – ja see ongi perearstina väärtus. Sa kombineerid eri lähenemisi vastavalt patsiendile.",
    };

    const detailedSummary = questions.map((q) => {
      const answerLetter = finalAnswers[q.id];
      const option = answerLetter ? q.options[answerLetter] : null;
      return {
        question: q.text,
        answerLetter: answerLetter || "-",
        answerText: option ? option.text : "(vastus puudub)",
        letter: option ? option.letter : "",
      };
    });

    setSummary(detailedSummary);
    setResult({ ...typeInfo, mbti });
    setIsFinished(true);
  };

  const handlePrev = () => {
    if (currentIndex === 0) return;
    setCurrentIndex((prev) => prev - 1);
  };

  const handleRestart = () => {
    setAnswers({});
    setIsFinished(false);
    setResult(null);
    setSummary([]);
    setEmail("");
    setName("");
    setEmailStatus(null);
    setCurrentIndex(0);
  };

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xwpyvkao";

const handleSendEmail = async (e) => {
  e.preventDefault();
  if (!result) return;

  if (!email || !email.includes("@")) {
    setEmailStatus("Palun sisesta kehtiv e-posti aadress.");
    return;
  }

  const subject = `Sinu perearsti tüüp: ${result.title} (${result.mbti})`;
  const body = buildEmailBody(name, result, summary);

  setEmailStatus("Saadan andmed...");

  try {
    const formData = new FormData();
    // väljade nimed: email, name, subject, message
    formData.append("email", email);
    formData.append("name", name || "tudeng");
    formData.append("subject", subject);
    formData.append("message", body);

    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    if (response.ok) {
      setEmailStatus(
        "Tulemus saadeti edukalt Formspree kaudu. Kontrolli oma postkasti (ja/või Formspree vormi seadistatud adressaati). 📬"
      );
      // soovi korral: tühjenda ainult email/name väljad, mitte kogu quizi state
      // setEmail("");
      // setName("");
    } else {
      setEmailStatus(
        "Midagi läks valesti Formspree poolel. Proovi hiljem uuesti või kopeeri tulemus käsitsi."
      );
    }
  } catch (err) {
    console.error(err);
    setEmailStatus(
      "Ei saanud Formspree'ga ühendust. Kontrolli internetti ja proovi uuesti."
    );
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark via-brand-mid to-brand-light text-slate-900 flex items-center justify-center px-4 py-8">
      <Card>
        <div className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Milline perearst sina oled?
          </h1>
          <p className="text-sm md:text-base text-slate-600">
            Tee 8 valikut ja saa teada.
          </p>
        </div>

        {!isFinished ? (
          <div>
            <ProgressBar current={currentIndex} total={questions.length} />

            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 text-center mt-8 mb-6 px-4">
                {currentQuestion.text}
              </h2>
                <div className="space-y-4">
                {["A", "B"].map((key) => {
                    const option = currentQuestion.options[key];
                    const isSelected = answers[currentQuestion.id] === key;

                    return (
                    <button
                        key={key}
                        type="button"
                        onClick={() => handleAnswer(key)}
                        className={`w-full text-left rounded-3xl border transition-all duration-150 shadow-sm hover:shadow-md focus:outline-none ${
                        isSelected
                            ? "border-brand-dark bg-brand-dark text-white"
                            : "border-slate-200 bg-white hover:border-brand-light"
                        }`}
                    >
                        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center p-4 md:p-6">
                        {/* Pilt – mobiilis üleval, desktopis vasakul */}
                        {option.image && (
                            <img
                            src={option.image}
                            alt={option.alt || option.text}
                            className="w-40 h-40 md:w-52 md:h-52 object-cover rounded-3xl border border-white/60 shadow-md mx-auto md:mx-0 shrink-0"
                            />
                        )}

                        {/* Tekst – mobiilis pildi all, desktopis paremal */}
                        <div className="flex-1 mt-3 md:mt-0">
                            <p className="text-lg md:text-xl font-semibold leading-snug">
                            {option.text}
                            </p>
                        </div>
                        </div>
                    </button>
                    );
                })}
                </div>


            </div>

            <div className="flex justify-between items-center mt-4 text-xs md:text-sm">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-3 py-2 rounded-lg border border-slate-300 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
              >
                ← Eelmine küsimus
              </button>
              <span className="text-slate-500">
                Vali vastus, et liikuda järgmise küsimuse juurde.
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {result && (
            <section className="pt-2">
                {/* Ülemine blokk – keskjoondatud */}
                <div className="flex flex-col items-center text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                    Sinu tulemus
                </h2>

                {/* SUUR PILT Sinu tulemus ja Perearsti tüüp vahel */}
                <img
                    src={result.image || "/result/default.png"} // muuda vastavalt oma failile
                    alt={result.title}
                    className="w-60 h-60 md:w-80 md:h-80 object-cover rounded-[2.25rem] shadow-xl mb-4"
                />

                <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-slate-500 mb-2">
                    Perearsti tüüp
                </p>

                <p className="text-xl md:text-2xl font-semibold text-slate-900 mb-1">
                    {result.title}
                </p>

                {result.subtitle && (
                    <p className="text-sm md:text-base text-slate-600 mb-3">
                    {result.subtitle}
                    </p>
                )}


                </div>

                {/* Pikk kirjeldus – loetavuse huvides jätame vasakule joondatuks */}
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                {result.description}
                </p>
            </section>
            )}


            <section>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Küsimuste ja vastuste ülevaade
              </h3>
              <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                {summary.map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl p-3 bg-white/70 text-xs md:text-sm"
                  >
                    <p className="font-semibold text-slate-900 mb-1">
                      {idx + 1}. {item.question}
                    </p>
                    <p className="text-slate-700">
                      <span className="font-semibold mr-1">
                        Sinu vastus:
                      </span>
                      {item.answerLetter !== "-" ? (
                        <>
                          <span className="font-mono mr-1">
                            {item.answerLetter})
                          </span>
                          <span>{item.answerText}</span>
                          {item.letter && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-mono text-slate-700">
                              {item.letter}
                            </span>
                          )}
                        </>
                      ) : (
                        <span>(vastus puudus)</span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Saada tulemus e-mailiga endale
              </h3>
              <form
                onSubmit={handleSendEmail}
                className="space-y-3 text-sm md:text-base"
              >
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Nimi (valikuline)
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/60 focus:border-slate-900"
                      placeholder="nt. Mari Meditsiinitudeng"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      E-posti aadress
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/60 focus:border-slate-900"
                      placeholder="sinunimi@näide.ee"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-brand-dark text-white text-sm font-medium shadow hover:shadow-md hover:bg-brand-mid transition-all"
                >
                  Saada tulemus e-mailile
                </button>

                {emailStatus && (
                  <p className="text-xs text-slate-600 mt-2">{emailStatus}</p>
                )}
              </form>
            </section>

            <div className="pt-2 flex justify-between items-center text-xs md:text-sm text-slate-600 border-t border-slate-200 mt-2">
              <button
                type="button"
                onClick={handleRestart}
                className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50"
              >
                Tee test uuesti
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
