export interface MbtiProfile {
  id: number;
  type: string;
  title: string;
  description: string;
  whoAreThey: string;
  methodology: string;
  coreStrengths: Record<string, string>;
  compatibility: {
    synergy: string;
    challenges: string;
  };
  growthJourney: string;
  quote: string;
}

export const mbtiProfiles: MbtiProfile[] = [
  // Analysts
  {
    id: 1,
    type: "🧠 INTJ",
    title: "🦹 'THE ARCHITECT' / 'THE LIEUTENANT'",
    description: "A profoundly analytical and visionary strategist driven by an unyielding desire to optimize systems and uncover universal truths.",
    whoAreThey: "Characterized by a relentless standard of intellectual excellence, Architects operate as autonomous visionaries who view the world as a complex puzzle waiting to be decoded. These individuals possess a uniquely vibrant, albeit heavily guarded, inner world that prizes objective rationality and logical precision above all else. They remain largely impervious to societal expectations, preferring to forge their own paths based on rigorous internal calculations rather than collective consensus. Despite their reputation for clinical detachment, Architects harbor a profound, underlying sensitivity and a rigid internal moral compass that informs their overarching life missions, driving them to pursue structural perfection in every endeavor they undertake. In romantic and interpersonal spheres, they operate with extreme deliberation; they appreciate subtle, practical gestures of assistance over flamboyant displays of affection, often initially deflecting help before systematically integrating a new partner into their highly guarded lives.",
    methodology: "The cognitive machinery of the Architect is propelled by Introverted Intuition paired with Extraverted Thinking. This configuration enables them to perceive hidden patterns, anticipate long-term macroscopic trends, and subsequently construct highly efficient, step-by-step paradigms to manifest their visions. They approach problem-solving through systematic deconstruction, isolating the core variables of any issue to eradicate redundancies. This methodology is teleological; every action is calculated and purposefully directed toward a definitive endpoint. Furthermore, their often-neglected tertiary Introverted Feeling function plays a critical role in their methodology, acting as a covert moderating force that aligns their ruthless logistical execution with deeply held, personal ethical standards, preventing their systemic optimizations from becoming entirely draconian.",
    coreStrengths: {
      "Strategic Vision": "Formulates highly complex, long-term master plans.",
      "Decisive Action": "Executes overarching objectives with unyielding determination.",
      "Objective Rationality": "Evaluates data with strict, unbiased intellectual rigor.",
      "Systemic Optimization": "Ruthlessly eliminates operational redundancies and waste."
    },
    compatibility: {
      synergy: "Architects find profound intellectual synergy with Campaigners (ENFP) and Debaters (ENTP). These extraverted, intuitive counterparts provide the lateral thinking and chaotic ideation that the Architect can seamlessly refine into actionable, organized structures, creating a deeply complementary feedback loop of innovation and execution.",
      challenges: "Friction invariably arises with Consuls (ESFJ) and Defenders (ISFJ). The Architect's prioritization of objective, unvarnished truth frequently collides with the Sentinel archetypes' need for immediate social harmony. To the Architect, arguing is an intellectual exercise, leading to profound dissonance with types who view debate as a hostile breakdown of emotional consensus."
    },
    growthJourney: "The primary developmental imperative for the Architect involves the conscious integration of their Introverted Feeling function. Maturation requires them to acknowledge that emotional variables and human unpredictability are valid, permanent data points in any systemic equation. By learning to embrace vulnerability and accept the inherent uncertainties of interpersonal dynamics, they transition from rigid tacticians into holistic, empathetic leaders who inspire rather than merely direct.",
    quote: "\"Never wrestle with a pig. You both get dirty, and the pig likes it.\" — THE ARCHITECT"
  },
  {
    id: 2,
    type: "💡 INTP",
    title: "🕵️ 'THE LOGICIAN' / 'THE POLYMATH'",
    description: "An endlessly curious intellectual pioneer who seeks to deconstruct the universe into its most fundamental, underlying principles.",
    whoAreThey: "Logicians are the quintessential polymaths of the typology spectrum, possessing an insatiable hunger for abstract knowledge and theoretical exploration. They navigate reality with a detached, philosophical demeanor, constantly questioning the validity of established norms and identifying logical inconsistencies that others routinely overlook. These individuals view the world through a lens of infinite variables, finding profound satisfaction in the pursuit of absolute, unvarnished truth. Socially, they are often perceived as enigmatic; they demonstrate a notable aversion to traditional flirtation or superficial emotional displays, preferring interactions anchored in genuine intellectual exchange, the sharing of complex ideas, and the mutual appreciation of high-level problem-solving.",
    methodology: "Driven by Introverted Thinking and Extraverted Intuition, the Logician's methodology is one of continuous, rigorous conceptual iteration. They internalize vast arrays of complex data, constructing exhaustive mental models that they subject to ruthless internal stress testing. Unlike their judging counterparts, they do not inherently seek closure; rather, they prefer to keep frameworks open to accommodate incoming data and new theoretical paradigms. This combination fosters a dynamic intellectual agility, allowing them to effortlessly pivot between disparate concepts. When communicating, they bypass emotional padding entirely, relying on the \"cold hard truth\" and expecting their counterparts to engage with their ideas purely on the merit of logical structural integrity.",
    coreStrengths: {
      "Abstract Deconstruction": "Deconstructs complex theories into fundamental axioms.",
      "Unbiased Objectivity": "Seeks the absolute truth devoid of emotional bias.",
      "Infinite Curiosity": "Pursues multidisciplinary knowledge relentlessly.",
      "Logical Innovation": "Generates highly original, unconventional paradigms."
    },
    compatibility: {
      synergy: "Logicians naturally align with Commanders (ENTJ) and Executives (ESTJ), who possess the decisive operational frameworks required to manifest the Logician's abstract concepts into tangible reality. They also share profound, low-friction intellectual bonds with Architects (INTJ), where mutual respect for rationality flourishes.",
      challenges: "Severe incompatibility often manifests with Entertainers (ESFP) and Consuls (ESFJ). The Logician's demand for unvarnished factual accuracy and their tendency to dismiss social rituals as illogical inefficiencies is frequently perceived as excessively abrasive and invalidating by types who prioritize immediate emotional resonance and communal harmony."
    },
    growthJourney: "The developmental trajectory for the Logician necessitates the cultivation of their inferior Extraverted Feeling. True growth occurs when they learn to articulate their highly complex ideas with emotional intelligence, validating the affective experiences of others rather than dismissing them as illogical. Furthermore, maturing Logicians must develop the discipline to transition their theoretical models into actionable, completed physical projects.",
    quote: "\"The cold, hard truth is the only foundation upon which a reliable universe can be built.\" — THE LOGICIAN"
  },
  {
    id: 3,
    type: "⚡ ENTJ",
    title: "👑 'THE COMMANDER' / 'THE LIEUTENANT'",
    description: "A formidable, strategic leader who leverages sheer willpower and intense analytical prowess to manifest ambitious, large-scale visions.",
    whoAreThey: "Commanders are natural-born leaders characterized by an extraordinary blend of charismatic authority and ruthless rationality. Embodying a drive for momentum and achievement, they view life as a grand chessboard where every move is calculated to maximize long-term gains. They thrive in environments of high-stakes complexity, taking decisive control of chaotic situations without hesitation. They are fundamentally growth-oriented, dedicating significant portions of their time to self-education, reading, and engaging with inspiring individuals to refine their mental frameworks. Their intensity and uncompromising standards can occasionally intimidate, but they are driven by a genuine, unshakeable belief that, given sufficient resources and willpower, any objective is attainable.",
    methodology: "The Commander operates through the dominant deployment of Extraverted Thinking supported by Introverted Intuition. This cognitive synergy allows them to instantly absorb external data, conceptualize a future state of optimal efficiency, and aggressively enforce the logistical steps required to reach it. Their methodology is aggressively forward-moving; they rarely hesitate to implement creative visions, preferring to correct course while in motion rather than succumbing to analysis paralysis. They are exceptionally adept at identifying and utilizing the talents of others, treating human capital as a strategic resource. However, their methodology includes a chilling degree of insensitivity when calling out the failures of others, prioritizing operational excellence over emotional tact.",
    coreStrengths: {
      "Strategic Execution": "Formulates sweeping, actionable global strategies.",
      "Momentum Generation": "Drives initiatives forward with relentless willpower.",
      "Charismatic Authority": "Projects commanding confidence that rallies groups.",
      "Systemic Optimization": "Eradicates inefficiencies with clinical precision."
    },
    compatibility: {
      synergy: "Commanders form exceptional alliances with Logicians (INTP) and Virtuosos (ISTP). These intellectually robust archetypes match the Commander's rational intensity while providing the specialized, granular analysis the Commander requires to execute their macroscopic plans. They also find deep alignment with other Extraverted Thinking types like the Executive (ESTJ) due to shared practical goals.",
      challenges: "Commanders frequently experience friction with Mediators (INFP) and Adventurers (ISFP). The Commander's penchant for objective efficiency and blunt critique is often interpreted as aggressive and deeply insensitive by types who navigate life through a strictly internal, values-based moral compass, leading to profound ideological clashes."
    },
    growthJourney: "For the Commander, psychological maturation requires the conscious development of affective empathy. Because their initial instinct is to call out failures bluntly, their growth journey involves recognizing that emotional intelligence is a critical component of sustainable leadership. They must learn that acknowledging the emotional bandwidth of their subordinates yields higher long-term efficiency than purely draconian optimization.",
    quote: "\"Your time is limited, so don't waste it living someone else's life.\" — THE COMMANDER"
  },
  {
    id: 4,
    type: "🌪️ ENTP",
    title: "🎭 'THE DEBATER' / 'THE POLITICIAN'",
    description: "A provocative and intellectually audacious innovator who revels in dismantling established paradigms to uncover novel possibilities.",
    whoAreThey: "Debaters are the ultimate intellectual provocateurs, defined by their dynamic mental agility and an almost compulsive need to challenge the status quo. They thrive on the friction of complex discourse, often adopting adversarial positions purely to stress-test the structural integrity of an argument. They are intensely passionate, quick-witted, and view rules as mere suggestions that limit human potential. Despite belonging to the intellectually rigorous Analyst role group, they often view themselves with a sense of irreverent simplicity, acting as the disruptive element in formal settings. For the Debater, life is an endless expanse of possibilities waiting to be explored, and they are energized by the sheer act of conceptualizing new realities, even if their arguments provoke yelling, glaring, and emotional exhaustion from their peers.",
    methodology: "The architectural core of the Debater is Extraverted Intuition paired with Introverted Thinking. Their methodology revolves around rapid-fire ideation; they intuitively connect seemingly unrelated concepts to form highly innovative hypotheses. Once a possibility is envisioned, they utilize their internal logical framework to aggressively analyze and refine it, often externalizing this process through relentless verbal sparring. This cognitive loop makes them exceptional at conceptual troubleshooting and improvisational problem-solving. However, their methodology inherently prioritizes the thrill of the intellectual chase over the implementation of the solution, causing them to frequently abandon projects the moment the underlying puzzle is solved, seeking the next intellectual high.",
    coreStrengths: {
      "Paradigm Disruption": "Challenges dogmatic norms with fearless inquiry.",
      "Rhetorical Mastery": "Deconstructs opposing arguments with rapid precision.",
      "Rapid Ideation": "Generates prolific arrays of innovative concepts.",
      "Dynamic Adaptability": "Pivots seamlessly in complex, shifting environments."
    },
    compatibility: {
      synergy: "Debaters establish profound intellectual resonance with Advocates (INFJ) and Architects (INTJ). These highly structured, intuitive types provide a grounding vision that focuses the Debater's chaotic ideation into actionable, long-term impact, matching their intuitive leaps while providing necessary closure.",
      challenges: "Relational dynamics with Defenders (ISFJ) and Consuls (ESFJ) frequently result in severe friction. The Debater's inherent need to dismantle tradition and argue for argument's sake directly threatens the Sentinels' core desire for stability, predictability, and emotional security, often leaving the Sentinel feeling as though they are \"talking to an angry wall\"."
    },
    growthJourney: "The developmental crux for the Debater lies in cultivating consistency and respecting interpersonal boundaries. Maturation requires them to acknowledge that continuous argumentation can wear down even the most patient partners. By developing their inferior Introverted Sensing, they learn to value follow-through, transforming their brilliant, fleeting ideas into sustainable, long-lasting realities while tempering their argumentative edge.",
    quote: "\"To uncover the truth, one must first be willing to dismantle the absolute.\" — THE DEBATER"
  },

  // Diplomats
  {
    id: 5,
    type: "🕊️ INFJ",
    title: "🌿 'THE ADVOCATE' / 'THE PROPHET'",
    description: "A deeply principled and profoundly empathetic visionary dedicated to catalyzing meaningful, systemic change in the human condition.",
    whoAreThey: "Operating as one of the rarest of the personality archetypes, Advocates possess an extraordinarily vibrant internal life defined by an unyielding dedication to their core values and a soulful attunement to human suffering. They navigate reality not through cold metrics, but through human terms, demonstrating a unique talent for warm, sensitive language. Despite their gentle demeanor, they harbor a fierce, uncompromising idealism and will take decisive action to advance concepts they believe will ameliorate societal ills. In romantic pursuits, they construct highly idealized visions of a perfect partner, refusing to settle for anything less than profound, authentic true love, which can sometimes lead to unrealistic expectations and extended periods of singlehood.",
    methodology: "The Advocate utilizes Introverted Intuition directed by Extraverted Feeling. This cognitive architecture drives them to seek the absolute root causes of human phenomena rather than addressing superficial symptoms. When presented with a societal or interpersonal issue, they unconsciously synthesize complex psychological variables into a singular, unified vision of how to resolve the core trauma. Their methodology is inherently catalytic; they do not simply wish to assist individuals temporarily, but strive to impart profound logical and emotional insights that empower others to permanently alter their life trajectories. They operate under the belief that planting a positive psychological seed will inevitably generate widespread progress.",
    coreStrengths: {
      "Profound Empathy": "Attunes deeply to the hidden emotional states of others.",
      "Root-Cause Vision": "Identifies and resolves the core origins of systemic issues.",
      "Unyielding Integrity": "Acts with uncompromising adherence to core principles.",
      "Transformative Care": "Drives long-term societal progress and healing."
    },
    compatibility: {
      synergy: "Advocates experience unparalleled synergy with Campaigners (ENFP) and Debaters (ENTP). The extraverted intuition of these partners draws the private Advocate outward, fostering a dynamic exchange of abstract ideas and shared visionary ideals, while balancing the Advocate's intensity with exploratory freedom.",
      challenges: "Interactions with Entrepreneurs (ESTP) and Executives (ESTJ) frequently yield dissonance. The Advocate's intensely abstract, future-oriented idealism and need for profound emotional depth often clash directly with these types' demand for immediate, tangible, and purely logistical action, resulting in mutual misunderstanding."
    },
    growthJourney: "The Advocate's growth journey centers on managing their extreme propensity for psychological burnout. Their passion, idealism, and impatience for routine maintenance frequently lead to severe physical and emotional exhaustion. To achieve sustainable impact, they must actively balance their soaring ideals with the pragmatic realities of day-to-day living, learning to extend their boundless empathy inward toward themselves.",
    quote: "\"You can 'be the change you wish to see in the world' - and it will be whatever you make it.\" — THE ADVOCATE"
  },
  {
    id: 6,
    type: "🌸 INFP",
    title: "📖 'THE MEDIATOR' / 'THE POET'",
    description: "An exceptionally imaginative and emotionally profound idealist who strives to align their external reality with their deep-seated inner values.",
    whoAreThey: "Beneath a quiet and unassuming exterior, Mediators possess fiercely passionate and vibrantly creative inner lives. They are deeply introspective souls, exquisitely attuned to the human condition, often experiencing profound emotional responses to art, nature, and the narratives of those around them. They are nonjudgmental and fundamentally compassionate, viewing the world through a lens of extreme sentimentality, frequently holding onto special keepsakes that fill their hearts with joy. In a fast-paced, competitive society, they frequently feel invisible, yet they remain anchored by an unshakeable internal moral compass, yearning constantly to forge deep, soulful relationships and to advocate for the misunderstood, representing a substantial portion of creative communities.",
    methodology: "The Mediator's operational framework is governed by Introverted Feeling and supported by Extraverted Intuition. This means every piece of external data, every interaction, and every decision is rigorously filtered through their intensely subjective, internal value system. Their methodology is non-linear and highly exploratory; they intuitively map the emotional resonance of various possibilities before committing to a course of action. When seeking solutions, they rely on metaphorical and abstract thinking, effortlessly inventing creative narratives and synthesizing disparate human experiences to find a path that feels fundamentally authentic to their soul. Authenticity and \"being seen\" are paramount, overriding any purely logical or logistical considerations.",
    coreStrengths: {
      "Boundless Empathy": "Provides compassionate, nonjudgmental space.",
      "Imaginative Depth": "Generates rich, highly original creative paradigms.",
      "Core Authenticity": "Operates in strict accordance with intrinsic core values.",
      "Soulful Connection": "Forges profound, transformative interpersonal bonds."
    },
    compatibility: {
      synergy: "Mediators find natural harmony with Protagonists (ENFJ) and Commanders (ENTJ). These decisive, external-facing types provide the structural scaffolding necessary to help the Mediator actualize their internal ideals in the physical world, offering a \"Golden Pair\" dynamic of visionary action.",
      challenges: "The Mediator experiences acute compatibility friction with the Executive (ESTJ) and the Logistician (ISTJ). Representing their exact cognitive opposites, the Sentinels' rigid adherence to objective metrics, strict traditions, and emotional detachment acts as an abrasive counterforce to the Mediator's need for subjective emotional freedom."
    },
    growthJourney: "The developmental path for the Mediator involves fortifying their psychological boundaries. Because the troubles of the world weigh heavily upon their shoulders, their immense empathy often transitions into a liability, leading to emotional paralysis. Maturation requires the integration of Extraverted Thinking, allowing them to transform their abstract ideals into actionable, structured change without being consumed by universal suffering.",
    quote: "\"All that is gold does not glitter; not all those who wander are lost.\" — THE MEDIATOR"
  },
  {
    id: 7,
    type: "🌟 ENFJ",
    title: "🧭 'THE PROTAGONIST' / 'THE ACTIVIST'",
    description: "A charismatic and deeply altruistic leader who excels at inspiring collectives toward a unified, benevolent vision of the future.",
    whoAreThey: "Protagonists operate as the ultimate champions of the people, possessing an extraordinary capacity to perceive the latent potential within others and the relentless drive to help them actualize it. They are natural pedagogues and social catalysts who navigate complex human ecosystems with grace, warmth, and an intuitive grasp of collective emotional undercurrents. Highly articulate and fiercely passionate, they step effortlessly into leadership roles, not for the sake of power, but out of an intrinsic moral obligation to guide humanity toward greater empathy and cooperation. Their conviction in the goodness of others is magnetic, allowing them to rally disparate factions around a shared, altruistic purpose, constantly pushing boundaries to get necessary, people-centric work accomplished.",
    methodology: "Functioning primarily through Extraverted Feeling supported by Introverted Intuition, the Protagonist's methodology centers on the orchestration of social harmony to achieve macro-level objectives. They constantly scan their environment to assess the emotional bandwidth and needs of the collective, absorbing these inputs to formulate a singular, visionary trajectory. When executing plans, they utilize highly persuasive rhetoric and affective attunement, effectively aligning the personal motivations of individuals with the broader goals of the group. They are systemic thinkers, but their systems are fundamentally composed of human psychology rather than cold logistics, employing motivation and shared values as their primary logistical tools.",
    coreStrengths: {
      "Charismatic Catalyst": "Mobilizes communities with magnetic, inspirational energy.",
      "Altruistic Vision": "Champions the holistic growth and self-actualization of others.",
      "Empathetic Attunement": "Accurately perceives and navigates complex social dynamics.",
      "Persuasive Rhetoric": "Communicates profound ideals with eloquent resonance."
    },
    compatibility: {
      synergy: "Protagonists synergize beautifully with Mediators (INFP) and Adventurers (ISFP). These internally focused, value-driven types provide the Protagonist with a grounding sense of individual authenticity, anchoring the Protagonist's broader societal visions in deep, personal truths.",
      challenges: "Significant friction occurs in relationships with Virtuosos (ISTP) and Logisticians (ISTJ). The Protagonist's continuous drive to unearth deeper emotional meaning and manage collective states is often perceived as intrusive and unnecessarily dramatic by types who prioritize immediate, detached, and highly autonomous factual logic."
    },
    growthJourney: "The psychological growth of the Protagonist relies heavily on the establishment of internal boundaries. Their intense drive to absorb and resolve the emotional burdens of the collective often results in the dangerous neglect of their own identity and physical needs. Maturation requires the realization that their capacity to heal others is inextricably linked to their ability to cultivate their own internal solitude and logical detachment.",
    quote: "\"When we elevate the collective, we inevitably elevate ourselves.\" — THE PROTAGONIST"
  },
  {
    id: 8,
    type: "🎨 ENFP",
    title: "🚀 'THE CAMPAIGNER' / 'THE FREE SPIRIT'",
    description: "An imaginative, energetic explorer driven to connect with people, spark new possibilities, and bring meaningful ideas to life.",
    whoAreThey: "Campaigners are deeply empathetic, highly imaginative individuals who possess an insatiable curiosity about the underlying interconnectedness of the universe. They exude a radiant enthusiasm that draws others to them, functioning as natural social explorers who reject rigid societal constraints in favor of authentic self-expression as \"free spirits\". Beneath their spontaneous exterior lies an intensely serious moral core; they are driven by a need to uncover the deeper meaning of life and will spend immense amounts of time exploring disparate relationships, philosophies, and career paths until they find a trajectory that resonates with their soul. They are fiercely independent in a conformist world, viewing every interpersonal interaction as a gateway to profound discovery.",
    methodology: "The Campaigner operates through a primary function of Extraverted Intuition, heavily moderated by Introverted Feeling. Their methodology is characterized by expansive, divergent thinking; they process reality by generating a continuous matrix of theoretical possibilities and abstract connections. Once these possibilities are generated, they are filtered through an intense, subjective evaluation of moral authenticity. They approach problem-solving organically, preferring to navigate by intuition and empathetic feedback rather than adhering to linear protocols. This allows them to foster incredibly innovative environments, though they frequently require partners to exhibit immense patience, as their verbal processing can become chaotic and loud during intense intellectual conflicts.",
    coreStrengths: {
      "Boundless Enthusiasm": "Injects environments with radiant, infectious energy.",
      "Creative Ingenuity": "Synthesizes highly original, abstract possibilities effortlessly.",
      "Emotional Resonance": "Forges rapid, deeply authentic connections with others.",
      "Fierce Independence": "Rejects conformity to pursue absolute personal truth."
    },
    compatibility: {
      synergy: "Campaigners find powerful resonance with Architects (INTJ) and Advocates (INFJ). The structured, convergent intuition of these partners provides the exact architectural scaffolding the Campaigner needs to ground their expansive ideas into tangible, world-changing realities, balancing imagination with direction.",
      challenges: "Relational dynamics with Executives (ESTJ) and Logisticians (ISTJ) frequently result in acute dissonance. The Campaigner's aversion to routine and authority fundamentally destabilizes the structured, tradition-bound environments that the Sentinel archetypes require to function optimally, leading to severe friction over lifestyle preferences."
    },
    growthJourney: "The crucial growth milestone for the Campaigner involves the cultivation of Introverted Sensing to develop steadfast logistical discipline. While they excel at initiating visionary projects, their maturation hinges upon their ability to tolerate the mundane repetition required to see these endeavors through to completion. True growth occurs when they find a definitive life path and anchor their imagination with grounded consistency.",
    quote: "\"The world is full of possibilities waiting to be discovered.\" — THE CAMPAIGNER"
  },

  // Sentinels
  {
    id: 9,
    type: "📚 ISTJ",
    title: "🛡️ 'THE LOGISTICIAN' / 'THE ANALYST'",
    description: "A meticulously reliable and intensely pragmatic cornerstone of society, dedicated to upholding order, integrity, and structural continuity.",
    whoAreThey: "Comprising a massive 11-14% of the global populace, Logisticians are the quiet, unassuming engines that ensure the functional continuity of modern society. They are profoundly rational, deeply reserved individuals who operate with methodical purpose, exhibiting an unyielding commitment to their duties. Logisticians view the world through a lens of empirical reality and historical precedent, demonstrating an intense aversion to frivolity and chaos. They value their autonomy immensely, often finding deep contentment in solitude, structured routines, and the independence of being single before committing to a relationship. Their integrity is absolute; they will fulfill their obligations irrespective of personal cost, quietly providing foundational stability without seeking recognition.",
    methodology: "Driven by Introverted Sensing and Extraverted Thinking, the Logistician approaches the world through a methodology of rigorous empirical comparison. They constantly reference a vast internal archive of past experiences and established facts, utilizing this data to formulate highly logical, step-by-step action plans. When confronted with a problem, they systematically isolate the core variables, discarding abstract theories in favor of proven, pragmatic solutions, believing that order and simplification are the first steps to mastery. They are fundamentally risk-averse, approaching life with the philosophy that perfection is achieved not by adding complexity, but by stripping away all inefficiencies.",
    coreStrengths: {
      "Unwavering Duty": "Fulfills obligations with absolute, uncompromising integrity.",
      "Meticulous Precision": "Executes tasks with an exacting, flawless attention to detail.",
      "Pragmatic Logic": "Analyzes complex scenarios using strict empirical data.",
      "Foundational Stability": "Provides the structural anchor for organizations and families."
    },
    compatibility: {
      synergy: "Logisticians forge highly stable, productive partnerships with Executives (ESTJ) and Entrepreneurs (ESTP). These types share the Logistician's demand for pragmatic action, respect for tangible reality, and lack of demand for excessive, abstract emotional processing.",
      challenges: "The Logistician experiences substantial friction with Campaigners (ENFP) and Mediators (INFP). The Logistician's reliance on historical precedent and rigid structure directly antagonizes the Diplomat's need for continuous, unconstrained exploration and subjective emotional validation, often misjudging the Diplomat's fluidity as mere laziness."
    },
    growthJourney: "The developmental imperative for the Logistician lies in the mitigation of their rigid internal judgments. Because they possess such formidable self-discipline, they frequently misjudge the unconventional struggles of others as procrastination or incompetence. Maturation requires them to develop their Extraverted Intuition, allowing them to embrace change, tolerate ambiguity, and recognize that human variance is inevitable.",
    quote: "\"I'd be more frightened by procrastination and laziness than by not using whatever abilities I'd been given.\" — THE LOGISTICIAN"
  },
  {
    id: 10,
    type: "🏡 ISFJ",
    title: "🩹 'THE DEFENDER' / 'THE NURSE'",
    description: "A profoundly dedicated and fiercely protective altruist who finds deep fulfillment in nurturing others and maintaining societal stability.",
    whoAreThey: "Defenders are the meticulous, warm-hearted caretakers of the personality spectrum, making up a dominant 13.8% of the US population. Operating with a profound sense of humility, they quietly sustain the emotional and physical well-being of their communities without seeking applause. They are deeply traditional individuals who derive intense satisfaction from creating secure, harmonious environments, firmly believing that love begins at home and is measured by the care put into everyday actions. While highly analytical and possessing an extraordinary memory for the personal details of others, this intelligence is entirely subordinated to their core mission of service. They view relationships as sacred trusts, maintaining tight inner circles where trust is paramount.",
    methodology: "The Defender's cognitive engine is powered by Introverted Sensing paired with Extraverted Feeling. This unique amalgamation results in a methodology of hyper-vigilant empathetic care. They continuously catalog massive amounts of sensory data regarding the people in their environment—remembering exact preferences, historical emotional triggers, and physiological needs. They then utilize this archived data to proactively orchestrate environments that preemptively eliminate discomfort and foster social cohesion. Their approach to problem-solving is intensely practical, relying on established, proven methods to deliver tangible assistance rather than abstract advice, ensuring that their families and communities remain structurally and emotionally intact.",
    coreStrengths: {
      "Fierce Protection": "Protects the well-being of their inner circle uncompromisingly.",
      "Nurturing Warmth": "Radiates a grounding, deeply empathetic emotional presence.",
      "Detail-Oriented Care": "Anticipates needs through an exhaustive memory for personal data.",
      "Traditional Reliability": "Upholds the crucial cultural and familial pillars of society."
    },
    compatibility: {
      synergy: "Defenders establish deeply fulfilling bonds with Executives (ESTJ) and Entrepreneurs (ESTP). The pragmatic, action-oriented nature of these partners provides a secure operational framework within which the Defender's nurturing capabilities can maximally flourish.",
      challenges: "Substantial interpersonal friction occurs with Debaters (ENTP) and Logicians (INTP). The abstract, disruptive, and frequently argumentative nature of these Analyst types fundamentally threatens the Defender's core need for environmental predictability and emotional consensus, often leading to deeply hurt feelings."
    },
    growthJourney: "The primary psychological hurdle for the Defender is their profound vulnerability to exploitation and burnout. Because they view their self-worth through the lens of service, they frequently neglect their own boundaries. True growth necessitates the conscious integration of Introverted Thinking, allowing them to objectively evaluate relational equities, assert their own needs, and realize that self-preservation is a prerequisite for sustainable altruism.",
    quote: "\"Love begins at home, and it is not how much we do... but how much love we put in that action.\" — THE DEFENDER"
  },
  {
    id: 11,
    type: "💼 ESTJ",
    title: "⚖️ 'THE EXECUTIVE' / 'THE BOSS'",
    description: "An unparalleled organizer of people and processes, driving systemic efficiency and enforcing structural integrity with unyielding resolve.",
    whoAreThey: "Executives are the quintessential pillars of institutional order, operating with an indomitable will and a profound dedication to efficiency. They are characterized by their directness, pragmatism, and absolute intolerance for ambiguity or incompetence. Viewing the world as a complex mechanism that requires vigilant maintenance, they willingly shoulder the burden of leadership to ensure that societal and corporate structures do not collapse into chaos. They possess a fierce traditionalism, deriving their principles from empirical facts and established precedents. While often perceived as rigid or tough—mirroring figures like courtroom judges or corporate executives—their demanding nature is rooted in a genuine belief that hard work and clear protocols are the truest expressions of societal care.",
    methodology: "Utilizing a dominant Extraverted Thinking function supported by Introverted Sensing, the Executive's methodology is one of aggressive systemic standardization. They interact with their environment by instantly evaluating its operational efficiency against a vast internal library of historical best practices. When anomalies or inefficiencies are detected, they immediately enforce corrective protocols, utilizing highly direct, unvarnished communication. They do not navigate by consensus or emotional persuasion; instead, they deploy objective metrics, clear hierarchical directives, and undeniable empirical data to drive collectives toward tangible outcomes, minimizing risk through exhaustive preparation.",
    coreStrengths: {
      "Systemic Efficiency": "Constructs flawlessly optimized, scalable operational systems.",
      "Unyielding Order": "Enforces vital institutional protocols with absolute integrity.",
      "Pragmatic Decisiveness": "Resolves complex logistical crises with immediate, concrete action.",
      "Direct Communication": "Articulates directives with unmistakable, objective clarity."
    },
    compatibility: {
      synergy: "Executives find excellent operational synergy with Consuls (ESFJ) and Logisticians (ISTJ). The shared appreciation for structured environments, societal traditions, and pragmatic reliability ensures a highly cohesive, low-friction dynamic defined by deep understanding.",
      challenges: "The Executive experiences their most profound compatibility challenges with Mediators (INFP), Adventurers (ISFP), and Campaigners (ENFP). The fundamental divergence between the Executive's demand for objective structure and the Diplomat/Explorer's need for subjective, emotional autonomy generates a dynamic fraught with intense friction and opposing lifestyles."
    },
    growthJourney: "To achieve holistic maturation, the Executive must cultivate their inferior Introverted Feeling function. Their relentless drive for efficiency frequently causes them to bulldoze over the emotional bandwidth of their subordinates. Growth requires the conscious realization that rigid adherence to protocols must occasionally be tempered with affective empathy, and that human emotional complexity is not merely an operational inefficiency to be eradicated.",
    quote: "\"The foundation of authority is based upon the consent of the people, guided by unyielding order.\" — THE EXECUTIVE"
  },
  {
    id: 12,
    type: "🤝 ESFJ",
    title: "☕ 'THE CONSUL' / 'THE COACH'",
    description: "An exceedingly gracious and highly attuned community builder who thrives on cultivating social harmony and providing unwavering mutual support.",
    whoAreThey: "Consuls represent the connective tissue of human society, defining their existence through their profound relationships and their ability to foster deeply integrated communities. They are vibrant, attentive, and highly altruistic individuals who view life as sweetest when shared with others. Driven by an intense need for social validation and mutual respect, they set out to create environments where every individual feels securely supported, placing special importance on romantic and familial milestones. They are deeply dutiful, adopting a clear, unambiguous moral code regarding societal responsibilities, and they are incredibly tireless in the face of hardship—provided they know their loved ones stand entirely behind them without criticism.",
    methodology: "The Consul approaches the world primarily through Extraverted Feeling, grounded by Introverted Sensing. This methodology is centered on the active orchestration of collective emotional states. They constantly monitor their environment to ensure that social norms, manners, and interpersonal equities are being meticulously upheld. Their decision-making process prioritizes the maintenance of consensus and the mitigation of conflict above all other variables. By referencing historical precedents of what has successfully maintained community cohesion in the past, they proactively implement practical, generous acts of hospitality to preemptively neutralize any brewing social discord, viewing their role as an active ambassador of goodwill.",
    coreStrengths: {
      "Social Alchemy": "Fuses disparate individuals into highly cohesive, loyal collectives.",
      "Unwavering Support": "Provides inexhaustible emotional backing to their inner circle.",
      "Generous Hospitality": "Cultivates exceptionally warm, inclusive, and secure environments.",
      "Practical Duty": "Executes community obligations with profound, reliable dedication."
    },
    compatibility: {
      synergy: "Consuls forge highly stable, mutually rewarding relationships with Adventurers (ISFP) and Executives (ESTJ). The grounding, pragmatic nature of these types provides a reliable foundation that allows the Consul's social warmth to thrive securely, complementing their need for order.",
      challenges: "Relationships with Logicians (INTP) and Debaters (ENTP) present severe psychological challenges. The Analyst's propensity for ruthless objective critique and their disregard for established social rituals strike directly at the Consul's core vulnerability, often leading to feelings of profound disrespect and depressive alienation."
    },
    growthJourney: "The developmental trajectory for the Consul necessitates the conscious decoupling of their self-esteem from external validation. Because they prize belonging so highly, less mature Consuls may compromise their own core principles simply to retain a partner's approval. Maturation requires the development of Introverted Thinking to establish an internal locus of identity, allowing them to process conflict objectively rather than internalizing it as a catastrophic personal failure.",
    quote: "\"Encourage, lift, and strengthen one another. For the positive energy spread to one will be felt by us all.\" — THE CONSUL"
  },

  // Explorers
  {
    id: 13,
    type: "🔧 ISTP",
    title: "⚙️ 'THE VIRTUOSO' / 'THE ENGINEER'",
    description: "A fiercely independent and masterfully adaptable pragmatist who interacts with the world through hands-on experimentation and tactical problem-solving.",
    whoAreThey: "Virtuosos are enigmatic, self-directed explorers defined by an intense individualistic mindset and a profound mechanical curiosity. They interact with their reality through direct, kinesthetic engagement, displaying an unparalleled ability to troubleshoot crises in real-time with practical solutions. They are profoundly autonomous, actively resisting micromanagement or rigid, long-term commitments that threaten their spontaneity. While they may appear aloof or entirely detached from the emotional undercurrents of a room, their minds are continuously analyzing the physical and logical variables of their surroundings, waiting for the precise moment to deploy their highly specialized, diverse skill sets to fix broken systems.",
    methodology: "The Virtuoso operates through a seamless integration of Introverted Thinking and Extraverted Sensing. Their methodology is fundamentally empirical and deconstructive. They seek to understand the universe not through abstract theories, but by taking the immediate physical world apart to comprehend its underlying mechanical or logical syntax. In crisis scenarios, they bypass complex planning entirely; their cognitive stack allows them to absorb immediate sensory data and output spontaneous, flawlessly calibrated tactical maneuvers. This makes them unparalleled troubleshooters, but their methodology is strictly localized to the present moment, frequently ignoring future implications or emotional collateral damage.",
    coreStrengths: {
      "Tactical Troubleshooting": "Deconstructs and resolves complex physical and logical puzzles.",
      "Spontaneous Adaptation": "Pivots instantaneously to neutralize immediate, high-stakes crises.",
      "Kinesthetic Analysis": "Processes complex data through direct, hands-on experimentation.",
      "Autonomous Action": "Operates with a fierce, uncompromising self-sufficiency."
    },
    compatibility: {
      synergy: "Virtuosos find highly compatible, low-friction dynamics with Executives (ESTJ) and Entrepreneurs (ESTP). These decisive, pragmatic leaders appreciate the Virtuoso's tactical execution, share their adventure-seeking present focus, and deeply respect their need for operational independence.",
      challenges: "Interactions with Advocates (INFJ) and Protagonists (ENFJ) frequently generate intense misunderstanding. The Diplomat's constant push for profound emotional disclosure and long-term, abstract societal vision completely overwhelms the Virtuoso's preference for localized logic and physical immediacy, leading to mutual exhaustion."
    },
    growthJourney: "To achieve psychological balance, the Virtuoso must consciously engage their inferior Extraverted Feeling function. Their natural inclination to isolate and view emotional expressions as illogical inefficiencies can severely damage their interpersonal relationships. Maturation involves recognizing that communicating their internal bandwidth and offering warmth to partners is a highly logical necessity for maintaining the social harmony they indirectly rely upon.",
    quote: "\"To truly understand a system, one must take it apart with their own hands.\" — THE VIRTUOSO"
  },
  {
    id: 14,
    type: "🎸 ISFP",
    title: "🎨 'THE ADVENTURER' / 'THE ARTIST'",
    description: "A profoundly sensitive and dynamically creative soul who navigates reality through an intense appreciation for experiential aesthetics and personal freedom.",
    whoAreThey: "Adventurers are the true bohemians of the typology matrix, characterized by a deep, quiet passion and an intense aversion to societal constraints. They are highly spontaneous, highly independent individuals who view their very lives as an evolving canvas of self-expression, actively questioning where their life is going purely out of an interest in self-reinvention. Deeply attuned to the aesthetic and sensory beauty of the world, they find profound resonance in rural landscapes, art, and authentic, non-verbal human connection. They harbor a fierce resistance to long-term commitments, as they feel suffocated when unable to follow the shifting currents of their own curiosity, preferring to let their actions speak louder than words.",
    methodology: "Guided heavily by Introverted Feeling and propelled by Extraverted Sensing, the Adventurer's methodology is rooted in experiential authenticity. They do not navigate life via strategic blueprints; rather, they synthesize immediate sensory inputs with their profound internal moral compass. Every action must feel aesthetically and emotionally true to their core identity. They interact with their environment by physically immersing themselves in it, absorbing the ambient beauty and reflecting it back through highly personalized, creative outputs. This cognitive framework ensures a life of intense vibrancy and adaptability, but inherently lacks the structural continuity required for macroscopic, logical organization.",
    coreStrengths: {
      "Experiential Artistry": "Transforms localized experiences into profound aesthetic realities.",
      "Authentic Expression": "Operates with uncompromising adherence to their unique identity.",
      "Spontaneous Freedom": "Adapts fluidly to entirely new environments and paradigm shifts.",
      "Sensory Attunement": "Perceives the subtle, beautiful nuances of the physical world."
    },
    compatibility: {
      synergy: "Adventurers experience high degrees of synergistic growth with Protagonists (ENFJ) and Consuls (ESFJ). The Extraverted Feeling of these partners provides a warm, validating environment that coaxes the intensely private Adventurer into sharing their rich internal world, offering the ultimate \"Golden Pair\" dynamic of visionary depth and grounded action.",
      challenges: "Severe structural incompatibility arises when partnered with Executives (ESTJ) or Commanders (ENTJ). The ruthless demand for objective metrics, rigid schedules, and long-term operational efficiency completely alienates the Adventurer, generating intense psychological friction and feelings of suffocation."
    },
    growthJourney: "The Adventurer's path to self-actualization demands the intentional development of their inferior Extraverted Thinking. While their desire for endless exploration is their greatest asset, their aversion to structure frequently leads to chronic life instability. By learning to implement pragmatic logistical frameworks, they gain the ability to successfully execute their creative visions, ensuring their artistry leaves a lasting, tangible impact.",
    quote: "\"Never let anyone dull your sparkle. You were made to shine.\" — THE ADVENTURER"
  },
  {
    id: 15,
    type: "🏍️ ESTP",
    title: "⚡ 'THE ENTREPRENEUR' / 'THE BUSINESS OWNER'",
    description: "An exceedingly kinetic and perceptive pragmatist who leverages immediate opportunities and bold action to navigate high-stakes environments.",
    whoAreThey: "Entrepreneurs are the undisputed masters of the immediate moment, characterized by relentless, high-octane energy and a profound capacity for risk-taking. They are intensely perceptive pragmatists who completely reject abstract theory in favor of tangible, physical action. Thriving on the edge of chaos, they possess an almost supernatural ability to read a room, immediately identifying social dynamics, hidden opportunities, and logistical weaknesses that others fail to perceive. They are charming, deeply resourceful, and utterly fearless, viewing life as a rapid-fire series of tactical maneuvers. Rather than drafting meticulous plans, they prefer to leap headfirst into the fray, supremely confident in their ability to adapt and engineer solutions on the fly.",
    methodology: "The Entrepreneur's operational dominance stems from the synthesis of Extraverted Sensing and Introverted Thinking. This cognitive alignment creates a methodology of rapid environmental exploitation. They absorb massive quantities of real-time physical data without a filter, instantly feeding it into an internal logical matrix to calculate the most advantageous immediate response. They do not plan for the future; they continuously adapt to the present. Their problem-solving is fundamentally transactional and highly physical; if an obstacle arises, they bypass bureaucratic protocols entirely, utilizing sheer kinetic force, snarky charm, and improvisational logic to bulldoze through it.",
    coreStrengths: {
      "Kinetic Action": "Executes high-impact decisions with instantaneous momentum.",
      "Tactical Perception": "Scans environments flawlessly to identify immediate leverage.",
      "Bold Risk-Taking": "Capitalizes fearlessly on chaotic, high-stakes opportunities.",
      "Pragmatic Resourcefulness": "Engineers highly practical solutions without prior preparation."
    },
    compatibility: {
      synergy: "Entrepreneurs form highly robust, effective alliances with Logisticians (ISTJ) and Defenders (ISFJ). The Sentinels provide the crucial administrative stability and detail-oriented anchoring that the Entrepreneur requires as a baseline to safely execute their high-risk, boundary-pushing ventures.",
      challenges: "Relational friction is exceptionally high with Advocates (INFJ) and Mediators (INFP). The Diplomat's insistence on abstract, future-oriented moralizing and deep emotional processing feels overwhelmingly restrictive, overly sensitive, and practically useless to the action-oriented, blunt Entrepreneur."
    },
    growthJourney: "The crucial evolutionary step for the Entrepreneur involves the mitigation of their chronic impulsivity. Bound by their inferior Introverted Intuition, they frequently fail to foresee the long-term, systemic consequences of their thrilling, in-the-moment decisions, leading to unhealthy lifestyle cycles. Maturation demands that they learn to briefly pause their kinetic methodology, utilizing forward-thinking reflection to ensure immediate tactical victories do not result in long-term strategic disasters.",
    quote: "\"Success demands that we trust our instincts, leap boldly into the fray, and figure out the mechanics on the way down.\" — THE ENTREPRENEUR"
  },
  {
    id: 16,
    type: "🎤 ESFP",
    title: "🌟 'THE ENTERTAINER' / 'THE STAND-UP'",
    description: "A vibrantly charismatic and irrepressibly enthusiastic presence who seeks to elevate the human experience through joy, connection, and sensory delight.",
    whoAreThey: "Entertainers operate as the magnetic epicenters of human joy, radiating an infectious zest for life that irrevocably alters the emotional landscape of any room they enter. They are supremely practical yet deeply emotionally connective, utilizing their intense charisma to break down social barriers and bring disparate individuals together in shared experiences. They crave the spotlight, not out of sheer ego, but from a profound desire to actively engage with the world and ensure that no one is left untouched by the beauty of the present moment. They are exceptionally resourceful, utilizing their aesthetic flair and immense interpersonal warmth to navigate life, though their extreme popularity can sometimes raise red flags for romantic partners who feel they must share the Entertainer's attention with the world.",
    methodology: "Functioning primarily through Extraverted Sensing coupled with Introverted Feeling, the Entertainer's methodology revolves around empathetic environmental immersion. They continuously scan their physical surroundings to detect the immediate emotional temperature of the collective. If the environment is stagnant, they intuitively deploy humor, performance, and sensory stimulation to elevate the baseline affect. They process the world largely through aesthetics and immediate, tangible human impact, preferring hands-on experiences over abstract conceptualization. Their decision-making is heavily influenced by how a choice will make others feel in the immediate present, making them unparalleled in crisis mediation, though highly vulnerable to long-term logistical oversight.",
    coreStrengths: {
      "Infectious Charisma": "Captivates and energizes crowds with undeniable magnetism.",
      "Empathetic Warmth": "Shares the emotional burdens of their loved ones deeply.",
      "Performative Flair": "Utilizes physical environments to craft profound experiences.",
      "Spontaneous Joy": "Injects mundane scenarios with vital, life-affirming playfulness."
    },
    compatibility: {
      synergy: "Entertainers discover deep, grounding harmony with Defenders (ISFJ) and Logisticians (ISTJ). The steadfast, reliable nature of these partners offers a secure anchor, providing the logistical maintenance that allows the Entertainer's chaotic vibrancy to flourish without resulting in total life instability.",
      challenges: "Interactions with Architects (INTJ) and Logicians (INTP) often yield profound disconnects. The Analyst's demand for rigid, abstract, and emotionally detached intellectualism acts as a suffocating vacuum to the Entertainer, who views such paradigms as fundamentally devoid of human vitality and practical joy."
    },
    growthJourney: "The primary developmental challenge for the Entertainer is the conscious construction of personal and professional infrastructure. Because they operate so heavily in the spontaneous present, they frequently neglect to build the logistical systems required to sustain their immense social networks. Growth requires the deliberate integration of Extraverted Thinking, allowing them to establish necessary routines and boundaries to avoid professional collapse.",
    quote: "\"Love generously, live audaciously, and chase after life with fierce determination.\" — THE ENTERTAINER"
  }
];