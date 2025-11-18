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
      },
      B: {
        text: "Tõmban sügavalt hinge ja keskendun: lähen ükshaaval süvitsi, mitte show'd tegema.",
        letter: "I",
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
      },
      B: {
        text: "Tunnen, et mul on sotsiaalne aku tühi ja vajan vaikust, et taastuda.",
        letter: "I",
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
      },
      B: {
        text: "Püüan esmalt aru saada tema elust ja suurest pildist – töö, pere, harjumused –, siis sobitan sinna meditsiini.",
        letter: "N",
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
      },
      B: {
        text: "Uurin pigem, kuidas see juhend mõtteviisi muudab ja millist tuleviku perearsti see eeldab.",
        letter: "N",
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
      },
      B: {
        text: "Püüan kõigepealt tema hirmu mõista ja siis talle kaasa minnes selgitada, miks teeme teisiti.",
        letter: "F",
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
      },
      B: {
        text: "Lasen tal natuke kauem rääkida ja otsin võimalusi, kuidas ta sotsiaalset tuge suurendada, isegi kui graafik natuke nihkuma hakkab.",
        letter: "F",
      },
    },
  },
  {
    id: 7,
    text: "Kuidas sa oma perearstikeskuse päeva planeeriksid?",
    dimension: "JP",
    options: {
      A: {
        text: "Mulle meeldib selge päevakava – kindlad ajad kroonilistele, ägedatele, e-konsultatsioonidele, tiimikoosolekule.",
        letter: "J",
      },
      B: {
        text: "Jätan päevakavasse hingamisruumi, kuhu saab vajadusel lisada ägedaid juhtumeid või pikemaid vestlusi.",
        letter: "P",
      },
    },
  },
  {
    id: 8,
    text: "E-konsultatsioonid ja digiregistratuur toovad ootamatult palju pöördumisi:",
    dimension: "JP",
    options: {
      A: {
        text: "Loome konkreetse protsessi: kes mida triageerib, mis on vastamise tähtajad, selged reeglid.",
        letter: "J",
      },
      B: {
        text: "Proovin esmalt paindlikult kohaneda: vaatan, mis päriselt töötab, ja timmin süsteemi jooksvalt.",
        letter: "P",
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
      "Sa hoiad perearstikeskuse töövoo, protsessid ja kvaliteedi joone peal. Patsient saab sinu juures süsteemset ja järjepidevat ravi.",
  },
  ISFJ: {
    title: "Kogukonna Kangelane",
    subtitle: "Turvaline ja hooliv perearst",
    description:
      "Sa tunned oma patsientide lugusid, hoiad pikemaid suhteid ja oled sageli pere usaldusisik mitme põlvkonna ulatuses.",
  },
  INFJ: {
    title: "Zen-Empaatiline Perearst",
    subtitle: "Sügav kuulaja ja märgaja",
    description:
      "Sa tabad varjatud muresid, kuulad rahulikult ja toetad eriti hästi vaimse tervise ning elukriiside korral.",
  },
  INTJ: {
    title: "Diagnostika Detektiiv",
    subtitle: "Strateegiline probleemilahendaja",
    description:
      "Sind käivitavad keerukad juhud ja süsteemsed lahendused. Sa ei lepi lihtsa selgitusega, kui andmed seda ei toeta.",
  },
  ISTP: {
    title: "Diagnostika Detektiiv",
    subtitle: "Rahulik analüütik",
    description:
      "Sa süvened faktidesse, võrdled mustreid ja leiad sageli üles just selle haruldase diagnoosi, mis teistel märkamata jääb.",
  },
  ISFP: {
    title: "Zen-Empaatiline Perearst",
    subtitle: "Vaikne, kuid väga hoidev",
    description:
      "Sa ei vaja rambivalgust – sinu tugevus on soe kohalolu, rahulik selgitamine ja patsiendi jaoks olemas olemine.",
  },
  INFP: {
    title: "Zen-Empaatiline Perearst",
    subtitle: "Ideaalist kantud hoolija",
    description:
      "Sa tahad, et patsiendil päriselt parem oleks – mitte ainult numbrites, vaid ka elukvaliteedis ja enesetundes.",
  },
  INTP: {
    title: "Diagnostika Detektiiv",
    subtitle: "Uudishimulik mõttelabor",
    description:
      "Sa naudid diagnostilisi mõistatusi ja tõenduspõhisust. Su peas elab väike teadlane, kes alati küsib: miks?",
  },
  ESTP: {
    title: "Kiirreageerija ja Multitaskija",
    subtitle: "Ägedate juhtude lemmik",
    description:
      "Sa oled omas elemendis siis, kui päev on tihe ja ettearvamatu. Kiired otsused ja praktilised lahendused on sinu tugevus.",
  },
  ESFP: {
    title: "Kiirreageerija ja Multitaskija",
    subtitle: "Särav suhtleja",
    description:
      "Patsiendiga kontakti loomine on sinu supervõime. Sa tood kabinetti soojust ja julgustad inimesi oma muredest rääkima.",
  },
  ENFP: {
    title: "Kiirreageerija ja Multitaskija",
    subtitle: "Loov ja energiline perearst",
    description:
      "Sa näed inimest tervikuna ja leiad sageli loovaid, elustiilikeskseid lahendusi. Rutiin ei tohi liiga pikalt kesta.",
  },
  ENTP: {
    title: "Kiirreageerija ja Multitaskija",
    subtitle: "Debattivõimeline ideegeneraator",
    description:
      "Sa armastad arutada uusi raviviise, digiideid ja süsteemimuudatusi. Patsiendid saavad sinult värskeid vaatenurki.",
  },
  ESTJ: {
    title: "Süsteemi Arhitekt",
    subtitle: "Korras süsteem, parem ravi",
    description:
      "Sa usud, et hea meditsiin vajab häid protsesse. Tänu sinule jookseb perearstikeskus nagu hästi õlitatud masin.",
  },
  ESFJ: {
    title: "Kogukonna Kangelane",
    subtitle: "Perearst, keda kõik teavad nimepidi",
    description:
      "Sa oled inimeste inimene – patsient tunneb, et on oodatud ja hoitud. Suhted ja kogukond on sinu suurimad tugevused.",
  },
  ENFJ: {
    title: "Kogukonna Kangelane",
    subtitle: "Inspireeriv perearst",
    description:
      "Sa suudad patsiente motiveerida muutustele – olgu see suitsetamisest loobumine või liikumisharjumuse leidmine.",
  },
  ENTJ: {
    title: "Süsteemi Arhitekt",
    subtitle: "Visiooniga juht-perearst",
    description:
      "Sa tahad lisaks patsientide ravile muuta ka süsteemi. Digilahendused, uued töökorraldused ja projektid tõmbavad sind.",
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

  const handleSendEmail = (e) => {
    e.preventDefault();
    if (!result) return;

    if (!email || !email.includes("@")) {
      setEmailStatus("Palun sisesta kehtiv e-posti aadress.");
      return;
    }

    const subject = `Sinu perearsti tüüp: ${result.title} (${result.mbti})`;
    const body = buildEmailBody(name, result, summary);

    const mailtoLink = `mailto:${encodeURIComponent(
      email
    )}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Avame kasutaja meiliprogrammi
    window.location.href = mailtoLink;
    setEmailStatus(
      "Avati e-kirja aken. Kontrolli kirja sisu ja vajuta saatmiseks \"Send\" / \"Saada\"."
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark via-brand-mid to-brand-light text-slate-900 flex items-center justify-center px-4 py-8">
      <Card>
        <div className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Milline perearst sina oled?
          </h1>
          <p className="text-sm md:text-base text-slate-600">
            Lühike ja lõbus konverentsimäng arstitudengitele – Briggs–Myersi
            inspiratsiooniga, aga täiesti mitteametlik.
          </p>
        </div>

        {!isFinished ? (
          <div>
            <ProgressBar current={currentIndex} total={questions.length} />

            <div className="mb-6">
              <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-4">
                {currentQuestion.text}
              </h2>
                <div className="space-y-3">
                {["A", "B"].map((key) => {
                    const option = currentQuestion.options[key];
                    const isSelected = answers[currentQuestion.id] === key;
                    return (
                    <button
                        key={key}
                        type="button"
                        onClick={() => handleAnswer(key)}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-sm md:text-base transition-all duration-150 shadow-sm hover:shadow-md focus:outline-none flex gap-3 items-start ${
                        isSelected
                            ? "border-brand-dark bg-brand-dark text-white"
                            : "border-slate-200 bg-white hover:border-brand-light"
                        }`}cd
                    >
                        <span className="font-semibold shrink-0 mt-0.5">
                        {key})
                        </span>
                        <span>{option.text}</span>
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
              <section>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                  Sinu tulemus
                </h2>
                <p className="text-sm uppercase tracking-wide text-slate-500 mb-1">
                  Perearsti tüüp
                </p>
                <p className="text-lg md:text-xl font-semibold text-slate-900 mb-1">
                  {result.title}
                </p>
                {result.subtitle && (
                  <p className="text-sm md:text-base text-slate-600 mb-2">
                    {result.subtitle}
                  </p>
                )}
                <p className="inline-flex items-center px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-mono mb-3">
                  MBTI: {result.mbti}
                </p>
                <p className="text-sm md:text-base text-slate-700">
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
              <span>Võid seda lehte kasutada vabalt konverentsimänguna. 🎈</span>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
