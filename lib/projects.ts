export interface Project {
  slug: string;
  title: string;
  category: "Machine Learning" | "NLP";
  summary: string;
  status: string;
  year: string;
  /** Optional deployed URL. Placeholders are marked in PLACEHOLDER_HOSTS below. */
  liveUrl?: string;
  demoVideo?: string;
  repoUrl: string;
  stack: string[];
  features: string[];
  /** Real numbers pulled from each repo's README */
  specs: { label: string; value: string }[];
  /** Architecture / pipeline stages, in order */
  architecture: { name: string; detail: string }[];
  limitations: string[];
  setup: { title: string; comment?: string; commands: string[] }[];
}

export const PLACEHOLDER_HOSTS = ["example.com"];
export const isPlaceholder = (url: string) =>
  PLACEHOLDER_HOSTS.some((h) => url.includes(h));

export const projects: Project[] = [
  {
    slug: "oil-spill-risk-classifier",
    title: "SIWES Oil Spill Risk Classifier",
    category: "Machine Learning",
    summary:
      "Severity classifier for Niger Delta oil spills built on NOSDRA incident records. Three XGBoost setups were compared on a 96%-Minor dataset; class weighting won on macro F1 and minority recall, at a large cost in precision.",
    status: "complete",
    year: "2026",
    liveUrl: "https://oil-spill-risk-classifier.streamlit.app",
    repoUrl: "https://github.com/shalombebx/oil-spill-risk-classifier.git",
    stack: [
      "Python",
      "pandas",
      "scikit-learn",
      "XGBoost",
      "GridSearchCV",
      "imbalanced-learn (SMOTENC)",
      "SHAP",
      "Streamlit",
    ],
    features: [
      "Predicts spill severity (Minor / Medium / Major) from 9 incident features available at reporting time",
      "Streamlit app: enter an incident profile, get a severity assessment from the class-weighted model",
      "Severity label engineered from NOSDRA barrel thresholds and habitat type",
      "Honest imbalance study: unweighted baseline vs SMOTENC (inside a CV pipeline) vs class weighting",
      "Five executed notebooks, one per CRISP-DM phase, plus reusable src/ modules",
    ],
    specs: [
      { label: "Source", value: "NOSDRA Oil Spill Monitor" },
      { label: "Raw data", value: "21,107 rows x 42 cols" },
      { label: "Usable", value: "13,202 rows (Unknown severity dropped)" },
      { label: "Split", value: "10,561 train / 2,641 test, stratified 80/20" },
      { label: "Class balance", value: "Minor 96.0% / Medium 3.6% / Major 0.4%" },
      { label: "Final model", value: "Class-weighted XGBoost (lr=0.1, depth=7, 100 trees)" },
      { label: "Macro F1", value: "0.420 (baseline 0.346, SMOTENC 0.371)" },
      { label: "Medium recall", value: "0.40 (baseline 0.03, SMOTENC 0.08)" },
      { label: "Major recall", value: "0.20, i.e. 2 of 10 test cases" },
      { label: "Precision", value: "0.12 for both Major and Medium" },
      { label: "Accuracy", value: "86.6% (baseline 95.9%)" },
    ],
    architecture: [
      { name: "Ingest", detail: "NOSDRA CSV, placed in data/raw/ (not tracked in git)." },
      { name: "Preprocess", detail: "Drop 34 columns (>20% missing, IDs, free text); extract year and month; label-encode categoricals; engineer the severity target." },
      { name: "Split", detail: "Stratified 80/20 with random_state=42. The test set holds only 10 Major cases, so Major metrics are indicative." },
      { name: "Imbalance", detail: "Baseline vs SMOTENC (capped at 600 rows per minority class, resampled on training folds only) vs balanced sample weights." },
      { name: "Select", detail: "Class-weighted XGBoost chosen on macro F1 and minority recall; weighted F1 is ignored because the Dummy classifier scores 0.94 on it." },
      { name: "Explain", detail: "SHAP TreeExplainer to be re-run on the final weighted model; earlier driver findings are marked unverified in the README." },
      { name: "Serve", detail: "streamlit_app.py loads models/xgboost_weighted_model.pkl and the saved encoders." },
    ],
    limitations: [
      "Major and Medium precision are both about 0.12: roughly 8 in 9 high-severity flags are false alarms. Recall was prioritised on purpose, because a needless investigation visit costs less than missing a serious spill.",
      "SMOTENC barely helped (Medium recall 0.03 to 0.08, Major stayed 0.00). Nine features that cannot observe spill volume cap what any resampling can recover.",
      "The model is a screening aid, not a decision-maker. Severity is derived from reported volume, so noise in that field carries into the target.",
      "SHAP driver findings (cause, habitat, company, year) still need re-verifying against the final model, and results come from a single split.",
    ],
    setup: [
      {
        title: "Get the code",
        commands: [
          "git clone https://github.com/shalombebx/oil-spill-risk-classifier.git",
          "cd oil-spill-risk-classifier",
        ],
      },
      {
        title: "Virtual environment and dependencies",
        commands: [
          "python -m venv venv",
          "source venv/bin/activate   # Windows: venv\\Scripts\\activate",
          "pip install -r requirements.txt",
        ],
      },
      {
        title: "Add the dataset",
        comment: "Not in the repo. Download from nosdra.oilspillmonitor.ng",
        commands: ["cp ~/Downloads/nosdra_*_complete.csv data/raw/"],
      },
      {
        title: "Reproduce the pipeline",
        comment: "Run notebooks 01 -> 05 in order; each depends on the last",
        commands: ["jupyter notebook notebooks/"],
      },
      {
        title: "Launch the app",
        comment: "Needs models/xgboost_weighted_model.pkl and label_encoders.pkl (from notebooks 03-04)",
        commands: ["streamlit run streamlit_app.py"],
      },
    ],
  },
  {
    slug: "smart-resume-screener",
    title: "Smart Resume Screener",
    category: "NLP",
    summary:
      "Local-first ATS that ranks resumes against a job description using Ollama embeddings and a five-signal scoring model. No API keys, no data leaves the machine.",
    status: "complete",
    year: "2026",
    demoVideo: "/reels/smart-resume-screener.mp4",
    repoUrl: "https://github.com/shalombebx/smart-resume-screener",
    stack: [
      "Python",
      "FastAPI",
      "Ollama",
      "nomic-embed-text",
      "llama3.2:1b",
      "pdfplumber",
      "python-docx",
      "Docker",
      "pytest",
    ],
    features: [
      "Semantic match scoring: cosine similarity on nomic-embed-text vectors",
      "Missing-skill detection through a ~190-alias, 59-skill ontology",
      "Batch PDF / DOCX / text parsing, up to 20 resumes per request",
      "Plain-language strengths, weaknesses and recommendation from llama3.2:1b",
      "SHA-256 keyed disk cache for embeddings; CSV / JSON export",
    ],
    specs: [
      { label: "API", value: "FastAPI, Swagger at /api/docs" },
      { label: "Embeddings", value: "nomic-embed-text (local)" },
      { label: "Reasoning", value: "llama3.2:1b (local)" },
      { label: "Weights", value: "50 embed / 20 keyword / 15 exp / 10 edu / 5 bonus" },
      { label: "Skill ontology", value: "59 skills, ~190 aliases" },
      { label: "Batch limit", value: "20 resumes (MAX_RESUMES_PER_BATCH)" },
      { label: "Upload limit", value: "10 MB per file" },
      { label: "Deploy", value: "docker compose up" },
    ],
    architecture: [
      { name: "Input", detail: "PDF via pdfplumber, DOCX via python-docx, or raw text." },
      { name: "Parse", detail: "Regex and ontology extraction of name, contact, skills, years of experience, education level." },
      { name: "Embed", detail: "Job description and each resume embedded locally, cached by SHA-256." },
      { name: "Score", detail: "Final = 0.50 embedding + 0.20 keyword + 0.15 experience + 0.10 education + 0.05 bonus." },
      { name: "Reason", detail: "llama3.2:1b writes summary, strengths, weaknesses, missing skills and fit level." },
      { name: "Serve", detail: "REST endpoints for upload, run, results and export; frontend/index.html served by the backend." },
    ],
    limitations: [
      "Runs on local CPU, so a batch takes noticeably longer than a hosted model would.",
      "A 1B-parameter model gives short, sometimes generic reasoning text.",
      "Scoring weights are hand-tuned, not learned from hiring outcomes.",
    ],
    setup: [
      {
        title: "Pull the local models",
        comment: "Install Ollama first: ollama.com",
        commands: ["ollama pull nomic-embed-text", "ollama pull llama3.2:1b"],
      },
      {
        title: "Get the code",
        commands: [
          "git clone https://github.com/shalombebx/smart-resume-screener.git",
          "cd smart-resume-screener",
        ],
      },
      {
        title: "Virtual environment and dependencies",
        commands: [
          "python -m venv venv",
          "source venv/bin/activate   # Windows: venv\\Scripts\\activate",
          "pip install -r requirements.txt",
        ],
      },
      {
        title: "Environment and folders",
        comment: "Defaults point at Ollama on 127.0.0.1:11434; no API key needed",
        commands: ["cp .env.example .env", "mkdir -p data/uploads data/cache exports"],
      },
      {
        title: "Run it",
        comment: "UI at localhost:8000, API docs at /api/docs",
        commands: ["python main.py", "# or: docker compose up --build", "# or: python demo.py   (terminal ranking of 5 sample resumes)"],
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);