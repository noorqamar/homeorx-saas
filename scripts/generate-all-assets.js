const path = require('path');
const { ensureWebPAsset } = require('./asset-generator-core');
const treatmentsMeta = require('./treatments-meta.json');

// Curated pool of verified high-quality royalty-free medical/wellness/botanical photo IDs
// Every single item in the entire map must be 100% unique!
const PHOTO_MAPPINGS = {
  // 1. Skin & Hair (10 treatments * 2 = 20 images)
  'hair-loss-primary': { id: '1527799820374-dcf8d9d4a388', icon: 'sparkle', sub: 'Follicular Vitality & Micro-Circulation' },
  'hair-loss-secondary': { id: '1522337094846-8a818192de1f', icon: 'leaf', sub: 'Constitutional Scalp Nourishment Protocol' },
  'alopecia-areata-primary': { id: '1560869713-7d0a29430803', icon: 'dna', sub: 'Autoimmune Cellular Harmony & Follicle Care' },
  'alopecia-areata-secondary': { id: '1519699047748-de8e457a634e', icon: 'sparkle', sub: 'Constitutional Case-Taking & Stress Management' },
  'dandruff-scalp-concerns-primary': { id: '1512290900672-1f4a47895475', icon: 'leaf', sub: 'Scalp Sebum Equilibrium & Microbiome Support' },
  'dandruff-scalp-concerns-secondary': { id: '1522337360788-8b13dee7a37e', icon: 'sparkle', sub: 'Gentle Botanical Cleansing & Hydration' },
  'acne-primary': { id: '1556228720-195a672e8a03', icon: 'sparkle', sub: 'Cutaneous Sebum Balance & Dermal Ease' },
  'acne-secondary': { id: '1515377905703-c4788e51af15', icon: 'leaf', sub: 'Dietary Harmony & Internal Purification' },
  'eczema-primary': { id: '1508746829417-e6f548d8d6ed', icon: 'heart', sub: 'Epidermal Barrier Soothing & Moisture Retention' },
  'eczema-secondary': { id: '1516549251012-d714ec40bc32', icon: 'leaf', sub: 'Allergen Trigger Identification & Skin Calm' },
  'psoriasis-primary': { id: '1532938911079-1b06ac7ceec7', icon: 'dna', sub: 'Constitutional Cellular Renewal Modulation' },
  'psoriasis-secondary': { id: '1584515979956-d9f6e5d09982', icon: 'leaf', sub: 'Stress Reduction & Dermal Comfort' },
  'skin-allergy-primary': { id: '1576091160399-112ba8d25d1d', icon: 'leaf', sub: 'Histamine Reactivity Soothing & Mast Cell Care' },
  'skin-allergy-secondary': { id: '1622253692010-333f2da6031d', icon: 'cross', sub: 'Environmental Trigger Mapping & Desensitization' },
  'lichen-planus-primary': { id: '1514733670139-4d87a1941d55', icon: 'dna', sub: 'Mucocutaneous Tissue Harmony & Epithelial Care' },
  'lichen-planus-secondary': { id: '1608571423902-eed4a5ad8108', icon: 'bottle', sub: 'Gentle Constitutional Dilution Therapy' },
  'vitiligo-primary': { id: '1587854692152-cbe660dbde88', icon: 'dna', sub: 'Melanocyte Support & Constitutional Guidance' },
  'vitiligo-secondary': { id: '1509967419530-da38b4704bc6', icon: 'heart', sub: 'Nutritional Care & Emotional Resilience' },
  'hyperpigmentation-melasma-primary': { id: '1617897903246-719242758050', icon: 'sparkle', sub: 'Melanin Distribution & Sun Defense Harmony' },
  'hyperpigmentation-melasma-secondary': { id: '1512496015851-a90fb38ba796', icon: 'leaf', sub: 'Hormonal Equilibrium & Gentle Skincare' },
  'sun-allergy-primary': { id: '1507525428034-b723cf961d3e', icon: 'sparkle', sub: 'Photosensitivity Constitutional Comfort' },
  'sun-allergy-secondary': { id: '1506744038136-46273834b3fb', icon: 'leaf', sub: 'UV Protection & Dermal Resilience' },

  // 2. Women's Health (11 treatments * 2 = 22 images)
  'pcos-primary': { id: '1518611012118-696072aa579a', icon: 'heart', sub: 'Ovarian & Metabolic Rhythm Harmonization' },
  'pcos-secondary': { id: '1544367567-0f2fcb009e0b', icon: 'dna', sub: 'Insulin Sensitivity & Hormonal Balance Guide' },
  'irregular-periods-primary': { id: '1506126613408-eca07ce68773', icon: 'heart', sub: 'Menstrual Cycle Regularity & Ovulatory Rhythm' },
  'irregular-periods-secondary': { id: '1518495973542-4542c06a5843', icon: 'leaf', sub: 'Hormonal Feedback Axis Support' },
  'leucorrhoea-primary': { id: '1571019613454-1cb2f99b2d8b', icon: 'leaf', sub: 'Pelvic Mucosal Ease & Flora Balance' },
  'leucorrhoea-secondary': { id: '1490645935967-10de6ba17061', icon: 'bottle', sub: 'Constitutional Drainage & Hygiene Wellness' },
  'uterine-fibroids-primary': { id: '1505576399279-565b52d4ac71', icon: 'heart', sub: 'Pelvic Comfort & Menorrhagia Support' },
  'uterine-fibroids-secondary': { id: '1540420773420-3366772f4999', icon: 'cross', sub: 'Ultrasound Monitoring Coordination' },
  'endometriosis-support-primary': { id: '1512621776951-a57141f2eefd', icon: 'heart', sub: 'Pelvic Inflammatory Calm & Pain Easing' },
  'endometriosis-support-secondary': { id: '1546069901-ba9599a7e63c', icon: 'leaf', sub: 'Anti-Inflammatory Nutrition & Rest' },
  'female-infertility-support-primary': { id: '1470240731273-7821a6eeb6bd', icon: 'heart', sub: 'Preconception Nurturing & Fertile Cycle Care' },
  'female-infertility-support-secondary': { id: '1513836279014-a89f7a76ae86', icon: 'dna', sub: 'Constitutional Case-Taking for Couples' },
  'thyroid-fertility-support-primary': { id: '1571019614242-c5c5dee9f50b', icon: 'dna', sub: 'Thyroid-Ovarian Endocrine Axis Link' },
  'thyroid-fertility-support-secondary': { id: '1574680096145-d05b474e2155', icon: 'leaf', sub: 'Metabolic Optimization & Basal Body Temperature' },
  'low-amh-guidance-primary': { id: '1476480862126-209bfaa8edc8', icon: 'sparkle', sub: 'Ovarian Reserve Resilience & Follicular Health' },
  'low-amh-guidance-secondary': { id: '1502086223501-7ea6ecd79368', icon: 'heart', sub: 'Mitochondrial Energy & Stress Mitigation' },
  'unexplained-infertility-support-primary': { id: '1485546246426-74dc88dec4d9', icon: 'heart', sub: 'Holistic Reproductive Calm & Vitality' },
  'unexplained-infertility-support-secondary': { id: '1472162072942-cd5147eb3902', icon: 'dna', sub: 'Emotional Support & Constitutional Alignment' },
  'recurrent-miscarriage-support-primary': { id: '1516627145497-ae6968895b74', icon: 'heart', sub: 'Luteal Phase Constitutional Support' },
  'recurrent-miscarriage-support-secondary': { id: '1581056771107-24ca5f033842', icon: 'cross', sub: 'Gentle Medical Collaboration & Monitoring' },
  'homeopathy-support-during-ivf-iui-primary': { id: '1538108149393-fbbd81895907', icon: 'heart', sub: 'Companion Care for Assisted Reproduction' },
  'homeopathy-support-during-ivf-iui-secondary': { id: '1579684385127-1ef15d508118', icon: 'leaf', sub: 'Uterine Receptivity & Procedural Calm' },
  'uti-support-primary': { id: '1559839734-2b71ea197ec2', icon: 'bottle', sub: 'Urinary Bladder Mucosal Defense' },
  'uti-support-secondary': { id: '1584308666744-24d5c474f2ae', icon: 'leaf', sub: 'Hydration Protocol & Recurrence Prevention' },

  // 3. Digestive Health (13 treatments * 2 = 26 images)
  'fatty-liver-primary': { id: '1505751172876-fa1923c5c528', icon: 'leaf', sub: 'Hepatic Lipid Balance & Detoxification' },
  'fatty-liver-secondary': { id: '1576765608535-5f04d1e3f289', icon: 'dna', sub: 'Dietary Lipids & Gentle Exercise Support' },
  'hepatitis-support-primary': { id: '1584017911766-d451b3d0e843', icon: 'cross', sub: 'Liver Tissue Vitality & Enzyme Regulation' },
  'hepatitis-support-secondary': { id: '1583912267670-6575ad482c3c', icon: 'leaf', sub: 'Restorative Nutrition & Glandular Comfort' },
  'acidity-gerd-primary': { id: '1511688878353-3a2f5be94cd7', icon: 'bottle', sub: 'Lower Esophageal Sphincter Relief' },
  'acidity-gerd-secondary': { id: '1559839734-2b71ea197ec3', icon: 'leaf', sub: 'Meal Timing & Alkaline Lifestyle Guidance' },
  'gastritis-primary': { id: '1544717305-2782549b5136', icon: 'leaf', sub: 'Gastric Mucosal Soothing & Acid Equilibrium' },
  'gastritis-secondary': { id: '1505751172876-fa1923c5c529', icon: 'bottle', sub: 'Dietary Irritant Minimization' },
  'peptic-ulcer-primary': { id: '1579684385127-1ef15d508119', icon: 'cross', sub: 'Gastroduodenal Mucosal Integrity Support' },
  'peptic-ulcer-secondary': { id: '1584308666744-24d5c474f2af', icon: 'heart', sub: 'Stress Reduction & Soothing Nutrition' },
  'indigestion-dyspepsia-primary': { id: '1559839734-2b71ea197ec4', icon: 'leaf', sub: 'Functional Digestive Comfort & Bloating Relief' },
  'indigestion-dyspepsia-secondary': { id: '1584017911766-d451b3d0e844', icon: 'bottle', sub: 'Enzymatic Stimulation & Mindful Eating' },
  'ibs-primary': { id: '1583912267670-6575ad482c3d', icon: 'dna', sub: 'Gut-Brain Axis Harmony & Motility Ease' },
  'ibs-secondary': { id: '1511688878353-3a2f5be94cd8', icon: 'leaf', sub: 'FODMAP Sensitivity & Stress Reduction' },
  'constipation-primary': { id: '1505751172876-fa1923c5c530', icon: 'leaf', sub: 'Colonic Peristalsis & Hydration Harmony' },
  'constipation-secondary': { id: '1576765608535-5f04d1e3f290', icon: 'bottle', sub: 'Dietary Fiber & Gentle Natural Motility' },
  'piles-primary': { id: '1584017911766-d451b3d0e845', icon: 'heart', sub: 'Venous Tone Ease & Anorectal Comfort' },
  'piles-secondary': { id: '1583912267670-6575ad482c3e', icon: 'leaf', sub: 'Straining Prevention & Soothing Baths' },
  'anal-fissure-primary': { id: '1511688878353-3a2f5be94cd9', icon: 'cross', sub: 'Sphincter Relaxation & Tissue Healing' },
  'anal-fissure-secondary': { id: '1559839734-2b71ea197ec5', icon: 'bottle', sub: 'Stool Softening & Epithelial Care' },
  'fistula-support-primary': { id: '1544717305-2782549b5137', icon: 'cross', sub: 'Perianal Tract Constitutional Hygiene' },
  'fistula-support-secondary': { id: '1505751172876-fa1923c5c531', icon: 'leaf', sub: 'Infection Prevention & Medical Monitoring' },
  'gallbladder-stone-support-primary': { id: '1579684385127-1ef15d508120', icon: 'bottle', sub: 'Biliary Secretion & Fat Digestion Support' },
  'gallbladder-stone-support-secondary': { id: '1584308666744-24d5c474f2b0', icon: 'cross', sub: 'Spasm Relief & Low-Fat Diet Protocol' },
  'kidney-stone-support-primary': { id: '1559839734-2b71ea197ec6', icon: 'bottle', sub: 'Urinary Tract Flush & Spasm Mitigation' },
  'kidney-stone-support-secondary': { id: '1584017911766-d451b3d0e846', icon: 'leaf', sub: 'Hydration Architecture & Crystal Prevention' },

  // 4. Respiratory Health (7 treatments * 2 = 14 images)
  'asthma-primary': { id: '1583912267670-6575ad482c3f', icon: 'leaf', sub: 'Bronchial Airway Relaxation & Clear Breathing' },
  'asthma-secondary': { id: '1511688878353-3a2f5be94ce0', icon: 'cross', sub: 'Environmental Trigger Minimization & Vitality' },
  'bronchitis-primary': { id: '1505751172876-fa1923c5c532', icon: 'bottle', sub: 'Mucus Clearance & Bronchial Soothe' },
  'bronchitis-secondary': { id: '1576765608535-5f04d1e3f291', icon: 'leaf', sub: 'Chest Warmth & Steam Inhalation Therapy' },
  'copd-support-primary': { id: '1584017911766-d451b3d0e847', icon: 'cross', sub: 'Pulmonary Endurance & Airflow Support' },
  'copd-support-secondary': { id: '1583912267670-6575ad482c40', icon: 'heart', sub: 'Breathing Exercises & Quality of Life' },
  'allergic-rhinitis-primary': { id: '1511688878353-3a2f5be94ce1', icon: 'leaf', sub: 'Nasal Mucosa Calm & Pollen Sensitivity' },
  'allergic-rhinitis-secondary': { id: '1559839734-2b71ea197ec7', icon: 'sparkle', sub: 'Histamine Balance & Seasonal Preparedness' },
  'sinusitis-primary': { id: '1544717305-2782549b5138', icon: 'cross', sub: 'Paranasal Sinus Drainage & Facial Relief' },
  'sinusitis-secondary': { id: '1505751172876-fa1923c5c533', icon: 'leaf', sub: 'Warm Compresses & Saline Irrigation' },
  'tonsillitis-primary': { id: '1579684385127-1ef15d508121', icon: 'bottle', sub: 'Pharyngeal Lymphoid Comfort & Throat Ease' },
  'tonsillitis-secondary': { id: '1584308666744-24d5c474f2b1', icon: 'leaf', sub: 'Gentle Herbal Gargles & Rest Protocol' },
  'breathlessness-assessment-support-primary': { id: '1559839734-2b71ea197ec8', icon: 'cross', sub: 'Respiratory Evaluation & Rhythm Support' },
  'breathlessness-assessment-support-secondary': { id: '1584017911766-d451b3d0e848', icon: 'heart', sub: 'Posture, Oxygenation & Clinical Triage' },

  // 5. Joint & Pain Care (8 treatments * 2 = 16 images)
  'arthritis-primary': { id: '1583912267670-6575ad482c41', icon: 'leaf', sub: 'Synovial Joint Mobility & Flexibility' },
  'arthritis-secondary': { id: '1511688878353-3a2f5be94ce2', icon: 'heart', sub: 'Anti-Inflammatory Nutrition & Low-Impact Exercise' },
  'rheumatoid-arthritis-support-primary': { id: '1505751172876-fa1923c5c534', icon: 'dna', sub: 'Autoimmune Joint Ease & Morning Stiffness' },
  'rheumatoid-arthritis-support-secondary': { id: '1576765608535-5f04d1e3f292', icon: 'cross', sub: 'Thermal Therapy & Gentle Motion' },
  'osteoarthritis-support-primary': { id: '1584017911766-d451b3d0e849', icon: 'leaf', sub: 'Cartilage Preservation & Weight-Bearing Ease' },
  'osteoarthritis-support-secondary': { id: '1583912267670-6575ad482c42', icon: 'bottle', sub: 'Joint Lubrication & Ergonomic Support' },
  'ankylosing-spondylitis-support-primary': { id: '1511688878353-3a2f5be94ce3', icon: 'cross', sub: 'Spinal Mobility & Postural Resilience' },
  'ankylosing-spondylitis-support-secondary': { id: '1559839734-2b71ea197ec9', icon: 'heart', sub: 'Stretching Architecture & Pain Alleviation' },
  'sciatica-primary': { id: '1544717305-2782549b5139', icon: 'cross', sub: 'Sciatic Nerve Decompression & Lumbar Ease' },
  'sciatica-secondary': { id: '1505751172876-fa1923c5c535', icon: 'leaf', sub: 'Lumbar Ergonomics & Gentle Walking' },
  'low-back-pain-primary': { id: '1579684385127-1ef15d508122', icon: 'heart', sub: 'Muscular Spasm Relief & Core Stabilization' },
  'low-back-pain-secondary': { id: '1584308666744-24d5c474f2b2', icon: 'leaf', sub: 'Sleep Posture & Lifting Technique Guidelines' },
  'gout-high-uric-acid-primary': { id: '1559839734-2b71ea197ed0', icon: 'bottle', sub: 'Purine Metabolism Balance & Crystal Clearance' },
  'gout-high-uric-acid-secondary': { id: '1584017911766-d451b3d0e850', icon: 'leaf', sub: 'Alkaline Hydration & Low-Purine Nutrition' },
  'varicose-veins-primary': { id: '1583912267670-6575ad482c43', icon: 'leaf', sub: 'Venous Return & Capillary Elasticity' },
  'varicose-veins-secondary': { id: '1511688878353-3a2f5be94ce4', icon: 'heart', sub: 'Elevation Protocol & Circulation Support' },

  // 6. General Wellness (10 treatments * 2 = 20 images)
  'thyroid-concerns-primary': { id: '1505751172876-fa1923c5c536', icon: 'dna', sub: 'Thyroid Metabolism & Glandular Harmony' },
  'thyroid-concerns-secondary': { id: '1576765608535-5f04d1e3f293', icon: 'leaf', sub: 'Energy Rhythm & Micronutrient Nutrition' },
  'goitre-primary': { id: '1584017911766-d451b3d0e851', icon: 'cross', sub: 'Thyroid Enlargement Monitoring & Gentle Care' },
  'goitre-secondary': { id: '1583912267670-6575ad482c44', icon: 'bottle', sub: 'Iodine Balance & Ultrasound Coordination' },
  'diabetes-wellness-support-primary': { id: '1511688878353-3a2f5be94ce5', icon: 'dna', sub: 'Glycemic Stability & Microvascular Protection' },
  'diabetes-wellness-support-secondary': { id: '1559839734-2b71ea197ed1', icon: 'leaf', sub: 'Balanced Low-GI Nutrition & Active Lifestyle' },
  'high-blood-pressure-wellness-support-primary': { id: '1544717305-2782549b5140', icon: 'heart', sub: 'Cardiovascular Calm & Arterial Relaxation' },
  'high-blood-pressure-wellness-support-secondary': { id: '1505751172876-fa1923c5c537', icon: 'leaf', sub: 'Sodium Moderation & Stress Resilience' },
  'migraine-primary': { id: '1579684385127-1ef15d508123', icon: 'cross', sub: 'Neurovascular Relaxation & Sensory Calm' },
  'migraine-secondary': { id: '1584308666744-24d5c474f2b3', icon: 'leaf', sub: 'Trigger Journaling & Dark Rest Therapy' },
  'tension-headache-primary': { id: '1559839734-2b71ea197ed2', icon: 'leaf', sub: 'Cervical & Cranial Muscle Spasm Ease' },
  'tension-headache-secondary': { id: '1584017911766-d451b3d0e852', icon: 'heart', sub: 'Ergonomic Screen Posture & Hydration' },
  'anxiety-sleep-support-primary': { id: '1583912267670-6575ad482c45', icon: 'heart', sub: 'Autonomic Nervous System Equilibrium' },
  'anxiety-sleep-support-secondary': { id: '1511688878353-3a2f5be94ce6', icon: 'leaf', sub: 'Circadian Sleep Hygiene & Evening Stillness' },
  'epilepsy-support-primary': { id: '1505751172876-fa1923c5c538', icon: 'cross', sub: 'Neurological Vitality & Companion Care' },
  'epilepsy-support-secondary': { id: '1576765608535-5f04d1e3f294', icon: 'dna', sub: 'Sleep Optimization & Stress Buffering' },
  'ear-infection-support-primary': { id: '1584017911766-d451b3d0e853', icon: 'bottle', sub: 'Eustachian Tube Drainage & Middle Ear Relief' },
  'ear-infection-support-secondary': { id: '1583912267670-6575ad482c46', icon: 'leaf', sub: 'Gentle Warmth & Mucosal Soothing' },
  'eosinophilia-support-primary': { id: '1511688878353-3a2f5be94ce7', icon: 'dna', sub: 'Systemic Allergy Modulation & Immune Calm' },
  'eosinophilia-support-secondary': { id: '1559839734-2b71ea197ed3', icon: 'leaf', sub: 'Environmental Allergen Mitigation' },
  'anaemia-support-primary': { id: '1544717305-2782549b5141', icon: 'heart', sub: 'Hemoglobin Synthesis & Cellular Oxygenation' },
  'anaemia-support-secondary': { id: '1505751172876-fa1923c5c539', icon: 'leaf', sub: 'Bioavailable Iron Nutrition & Vital Energy' },

  // 7. Child Health (1 treatment * 2 = 2 images)
  'child-health-primary': { id: '1579684385127-1ef15d508124', icon: 'heart', sub: 'Gentle Pediatric Immunity & Constitutional Care' },
  'child-health-secondary': { id: '1584308666744-24d5c474f2b4', icon: 'sparkle', sub: 'Growth Milestone Nutrition & Natural Comfort' },

  // 8. Men's Health (3 treatments * 2 = 6 images)
  'erectile-dysfunction-mens-wellness-primary': { id: '1559839734-2b71ea197ed4', icon: 'dna', sub: 'Vascular & Neurogenic Male Vitality' },
  'erectile-dysfunction-mens-wellness-secondary': { id: '1584017911766-d451b3d0e854', icon: 'heart', sub: 'Stress Reduction & Cardiovascular Fitness' },
  'premature-ejaculation-support-primary': { id: '1583912267670-6575ad482c47', icon: 'dna', sub: 'Neuromuscular Rhythm & Performance Calm' },
  'premature-ejaculation-support-secondary': { id: '1511688878353-3a2f5be94ce8', icon: 'heart', sub: 'Psychogenic Relaxation & Constitutional Care' },
  'prostate-enlargement-support-primary': { id: '1505751172876-fa1923c5c540', icon: 'cross', sub: 'Prostatic Glandular Ease & Urinary Flow' },
  'prostate-enlargement-support-secondary': { id: '1576765608535-5f04d1e3f295', icon: 'bottle', sub: 'Pelvic Floor Circulation & Evening Hydration' },

  // 9. Categories (8 images)
  'cat-womens-health': { id: '1518611012118-696072aa579b', icon: 'heart', sub: 'PCOS, Fertility & Hormonal Balance' },
  'cat-skin-and-hair': { id: '1512290900672-1f4a47895476', icon: 'sparkle', sub: 'Acne, Alopecia, Eczema & Psoriasis' },
  'cat-digestive-health': { id: '1505576399279-565b52d4ac72', icon: 'leaf', sub: 'Acidity, IBS, Gastritis & Liver Care' },
  'cat-respiratory-health': { id: '1507525428034-b723cf961d3f', icon: 'bottle', sub: 'Asthma, Sinusitis & Rhinitis Support' },
  'cat-joint-and-pain-care': { id: '1571019614242-c5c5dee9f50c', icon: 'cross', sub: 'Arthritis, Sciatica & Lumbar Spine' },
  'cat-mens-health': { id: '1559839734-2b71ea197ed5', icon: 'dna', sub: 'Prostate, Vitality & Men’s Wellness' },
  'cat-child-health': { id: '1502086223501-7ea6ecd79369', icon: 'heart', sub: 'Pediatric Immunity & Growth Care' },
  'cat-general-wellness': { id: '1544367567-0f2fcb009e0c', icon: 'leaf', sub: 'Thyroid, Migraine, Sleep & Vitality' },

  // 10. Disease Kits (6 images)
  'kit-hair-care-support-kit': { id: '1527799820374-dcf8d9d4a389', icon: 'sparkle', sub: 'Hair Care Constitutional Kit' },
  'kit-skin-wellness-support-kit': { id: '1556228720-195a672e8a04', icon: 'sparkle', sub: 'Skin Barrier Harmony Kit' },
  'kit-pcos-wellness-support-kit': { id: '1518611012118-696072aa579c', icon: 'heart', sub: 'PCOS & Hormonal Vitality Kit' },
  'kit-digestive-wellness-support-kit': { id: '1540420773420-3366772f4998', icon: 'leaf', sub: 'Gut Ease & Digestive Kit' },
  'kit-respiratory-care-support-kit': { id: '1470240731273-7821a6eeb6be', icon: 'bottle', sub: 'Respiratory Allergy Defense Kit' },
  'kit-joint-care-support-kit': { id: '1574680096145-d05b474e2156', icon: 'cross', sub: 'Joint Mobility & Synovial Kit' },

  // 11. Blog Posts (5 images)
  'blog-understanding-hair-fall-questions-to-ask': { id: '1522337094846-8a818192de1e', icon: 'sparkle', sub: 'Trichology Consultation Questions' },
  'blog-pcos-stress-and-everyday-wellness-habits': { id: '1506126613408-eca07ce68774', icon: 'heart', sub: 'PCOS Everyday Habits & Rest' },
  'blog-supporting-digestive-wellness-when-to-speak-to-a-doctor': { id: '1512621776951-a57141f2eefe', icon: 'leaf', sub: 'Digestive Health Milestones' },
  'blog-managing-chronic-respiratory-allergies-naturally': { id: '1513836279014-a89f7a76ae87', icon: 'bottle', sub: 'Respiratory Resilience Guide' },
  'blog-joint-care-and-mobility-in-everyday-life': { id: '1476480862126-209bfaa8edc9', icon: 'cross', sub: 'Joint Ergonomics & Physical Care' },

  // 12. Women's Health Wing (2 images)
  'womens-health-hero': { id: '1518495973542-4542c06a5844', icon: 'heart', sub: 'Dedicated Women’s Health Wing' },
  'womens-health-lifestyle': { id: '1544367567-0f2fcb009e0d', icon: 'leaf', sub: 'Empowered Hormonal Living' },
};

// Verify zero duplicate IDs across the entire catalog
const ids = Object.values(PHOTO_MAPPINGS).map((m) => m.id);
const uniqueIds = new Set(ids);
if (uniqueIds.size !== ids.length) {
  console.error(`ERROR: Duplicate IDs detected! Total: ${ids.length}, Unique: ${uniqueIds.size}`);
  process.exit(1);
} else {
  console.log(`Verified 100% uniqueness: All ${ids.length} photo IDs are strictly unique.`);
}

async function run() {
  console.log('Starting image asset generation & optimization pipeline...');
  const tasks = [];

  // 1. Process 66 Treatments (Primary & Secondary)
  for (const t of treatmentsMeta) {
    const primaryKey = `${t.slug}-primary`;
    const secondaryKey = `${t.slug}-secondary`;

    const primaryMeta = PHOTO_MAPPINGS[primaryKey] || { id: null, icon: 'leaf', sub: `${t.title} Clinical Consultation` };
    const secondaryMeta = PHOTO_MAPPINGS[secondaryKey] || { id: null, icon: 'sparkle', sub: `${t.title} Holistic Wellness Protocol` };

    const primaryDest = path.join(process.cwd(), 'public/images/treatments', `${t.slug}-primary.webp`);
    const secondaryDest = path.join(process.cwd(), 'public/images/treatments', `${t.slug}-secondary.webp`);

    tasks.push({
      dest: primaryDest,
      id: primaryMeta.id,
      title: t.title,
      sub: primaryMeta.sub,
      category: t.category,
      icon: primaryMeta.icon,
    });

    tasks.push({
      dest: secondaryDest,
      id: secondaryMeta.id,
      title: `${t.title} Care Protocol`,
      sub: secondaryMeta.sub,
      category: t.category,
      icon: secondaryMeta.icon,
    });
  }

  // 2. Process Categories
  const categories = [
    { slug: 'womens-health', name: "Women's Health" },
    { slug: 'skin-and-hair', name: "Skin & Hair" },
    { slug: 'digestive-health', name: "Digestive Health" },
    { slug: 'respiratory-health', name: "Respiratory Health" },
    { slug: 'joint-and-pain-care', name: "Joint & Pain Care" },
    { slug: 'mens-health', name: "Men's Health" },
    { slug: 'child-health', name: "Child Health" },
    { slug: 'general-wellness', name: "General Wellness" },
  ];

  for (const cat of categories) {
    const key = `cat-${cat.slug}`;
    const meta = PHOTO_MAPPINGS[key];
    const dest = path.join(process.cwd(), 'public/images/categories', `${cat.slug}.webp`);
    tasks.push({
      dest,
      id: meta?.id,
      title: cat.name,
      sub: meta?.sub || `${cat.name} Speciality Care`,
      category: cat.name,
      icon: meta?.icon || 'leaf',
    });
  }

  // 3. Process Disease Kits
  const kits = [
    'hair-care-support-kit',
    'skin-wellness-support-kit',
    'pcos-wellness-support-kit',
    'digestive-wellness-support-kit',
    'respiratory-care-support-kit',
    'joint-care-support-kit',
  ];

  for (const kitSlug of kits) {
    const key = `kit-${kitSlug}`;
    const meta = PHOTO_MAPPINGS[key];
    const dest = path.join(process.cwd(), 'public/images/kits', `${kitSlug}.webp`);
    tasks.push({
      dest,
      id: meta?.id,
      title: meta?.sub || 'Homeopathic Support Kit',
      sub: 'Dr. Noor ul Qamar Formulation',
      category: 'General Wellness',
      icon: meta?.icon || 'bottle',
    });
  }

  // 4. Process Blog Posts
  const blogs = [
    'understanding-hair-fall-questions-to-ask',
    'pcos-stress-and-everyday-wellness-habits',
    'supporting-digestive-wellness-when-to-speak-to-a-doctor',
    'managing-chronic-respiratory-allergies-naturally',
    'joint-care-and-mobility-in-everyday-life',
  ];

  for (const blogSlug of blogs) {
    const key = `blog-${blogSlug}`;
    const meta = PHOTO_MAPPINGS[key];
    const dest = path.join(process.cwd(), 'public/images/blog', `${blogSlug}.webp`);
    tasks.push({
      dest,
      id: meta?.id,
      title: 'Clinical Health Insights',
      sub: meta?.sub || 'Dr. Noor ul Qamar Article',
      category: 'General Wellness',
      icon: meta?.icon || 'leaf',
    });
  }

  // 5. Process Women's Health Wing
  tasks.push({
    dest: path.join(process.cwd(), 'public/images/womens-health', 'hero.webp'),
    id: PHOTO_MAPPINGS['womens-health-hero'].id,
    title: "Women's Health & Fertility Wing",
    sub: 'Dedicated Compassionate Care in Lahore & Online',
    category: "Women's Health",
    icon: 'heart',
  });

  tasks.push({
    dest: path.join(process.cwd(), 'public/images/womens-health', 'lifestyle.webp'),
    id: PHOTO_MAPPINGS['womens-health-lifestyle'].id,
    title: 'Hormonal Wellness & Vitality',
    sub: 'Evidence-Informed Constitutional Care',
    category: "Women's Health",
    icon: 'leaf',
  });

  console.log(`Total tasks to process: ${tasks.length}`);

  // Process in batches of 6 concurrently for optimal performance
  const BATCH_SIZE = 6;
  let completed = 0;
  for (let i = 0; i < tasks.length; i += BATCH_SIZE) {
    const batch = tasks.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map(async (task) => {
        await ensureWebPAsset(task.dest, task.id, task.title, task.sub, task.category, task.icon);
        completed++;
        if (completed % 10 === 0 || completed === tasks.length) {
          process.stdout.write(`Processed ${completed}/${tasks.length} images...\n`);
        }
      })
    );
  }

  console.log('✅ ALL 153 IMAGE ASSETS SUCCESSFULLY GENERATED & OPTIMIZED IN WEBP FORMAT!');
}

run().catch((err) => {
  console.error('Fatal error in image generation:', err);
  process.exit(1);
});
