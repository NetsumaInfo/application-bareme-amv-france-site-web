import {
  Check,
  ChevronDown,
  Download,
  FilePlus,
  FolderOpen,
  Maximize2,
  Play,
  Save,
  Settings2,
  SkipForward,
} from 'lucide-react'

const clipRows = [
  ['01', 'Kurobara', 'Afterimage', '12.5'],
  ['02', 'Miko', 'Signal Bloom', '14.0'],
  ['03', 'Steiner', 'Night Cut', '11.75'],
  ['04', 'Aline', 'Ghost Loop', '13.25'],
]

const criteria = [
  ['Montage', '8.5', '10'],
  ['Rythme', '4.0', '5'],
  ['Impact', '4.5', '5'],
]

const resultRows = [
  ['1', 'Signal Bloom', 'Miko', '87.4'],
  ['2', 'Afterimage', 'Kurobara', '83.1'],
  ['3', 'Ghost Loop', 'Aline', '79.6'],
  ['4', 'Night Cut', 'Steiner', '76.8'],
]

export function HeroProductScene() {
  return (
    <div className="hero-scene" aria-hidden="true">
      <div className="app-window app-window-main">
        <div className="window-bar">
          <div className="window-title">
            <span>AMV Notation</span>
            <span>Japan Expo 2026</span>
          </div>
          <div className="window-tools">
            <FilePlus size={13} />
            <FolderOpen size={13} />
            <Save size={13} />
            <Settings2 size={13} />
          </div>
        </div>

        <div className="workspace-grid">
          <div className="video-pane">
            <div className="video-frame">
              <Play size={28} />
              <div className="video-caption">01:18.42</div>
            </div>
            <div className="player-controls">
              <span>mpv</span>
              <div className="timeline-track">
                <span />
              </div>
              <Maximize2 size={13} />
            </div>
          </div>

          <div className="notation-pane">
            <div className="clip-header">
              <div>
                <strong>Signal Bloom</strong>
                <span>Miko - Finalistes AMV</span>
              </div>
              <div className="score-total">17.0 / 20</div>
            </div>
            <div className="criteria-list">
              {criteria.map(([label, value, max]) => (
                <div className="criterion-row" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                  <em>/ {max}</em>
                </div>
              ))}
            </div>
            <div className="notes-block">
              <span>00:43.12</span>
              Transition forte, impact synchro clair.
            </div>
          </div>

          <div className="table-pane">
            <div className="table-header">
              <span>Clips</span>
              <span>Note</span>
            </div>
            {clipRows.map(([index, author, title, score]) => (
              <div className="clip-table-row" key={title}>
                <span>{index}</span>
                <div>
                  <strong>{title}</strong>
                  <em>{author}</em>
                </div>
                <span>{score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="floating-window floating-results">
        <div className="mini-window-title">Resultats</div>
        {resultRows.slice(0, 3).map(([rank, title, author, score]) => (
          <div className="result-line" key={title}>
            <span>{rank}</span>
            <strong>{title}</strong>
            <em>{author}</em>
            <b>{score}</b>
          </div>
        ))}
      </div>

      <div className="floating-window floating-export">
        <Download size={15} />
        <span>Export PNG / PDF / JSON</span>
      </div>
    </div>
  )
}

export function TutorialScene({
  id,
}: {
  id: 'project' | 'import' | 'score' | 'export'
}) {
  if (id === 'project') return <CreateProjectScene />
  if (id === 'import') return <ImportScene />
  if (id === 'score') return <ScoreScene />
  return <ExportScene />
}

function Cursor() {
  return (
    <div className="tutorial-cursor">
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <path d="M5 3l17 12-8 1.4 4.1 7.4-3.1 1.7-4.1-7.4-5.9 5.7V3z" />
      </svg>
      <span />
    </div>
  )
}

function CreateProjectScene() {
  return (
    <div className="tutorial-screen create-screen">
      <div className="screen-topbar">
        <button className="mock-menu target-menu">
          Fichier <ChevronDown size={11} />
        </button>
        <button className="mock-icon">
          <Save size={12} />
        </button>
        <button className="mock-icon">
          <Settings2 size={12} />
        </button>
      </div>
      <div className="mock-dropdown">
        <div>
          <FilePlus size={12} /> Nouveau concours
        </div>
        <div>
          <FolderOpen size={12} /> Ouvrir...
        </div>
      </div>
      <div className="mock-modal">
        <div className="modal-title">Nouveau concours</div>
        <label>Nom du concours</label>
        <div className="input-line">
          <span className="typed typed-name">Japan Expo 2026</span>
        </div>
        <label>Nom du juge</label>
        <div className="input-line">
          <span className="typed typed-judge">Netsuma</span>
        </div>
        <label>Bareme</label>
        <div className="select-line">
          Officiel AMV <span>12 criteres, 100 pts</span>
        </div>
        <button className="primary-action target-create">
          Creer le concours
        </button>
      </div>
      <div className="project-created">
        <Check size={14} />
        <span>Japan Expo 2026</span>
        <em>Projet cree</em>
      </div>
      <Cursor />
    </div>
  )
}

function ImportScene() {
  return (
    <div className="tutorial-screen import-screen">
      <div className="screen-sidebar">
        <button className="target-import">
          <FolderOpen size={13} /> Importer un dossier
        </button>
        <button>Rattacher videos</button>
        <button>Mode sans video</button>
      </div>
      <div className="folder-panel">
        <div className="folder-path">D:\Concours\AMV\Finalistes</div>
        <div className="scan-bar">
          <span />
        </div>
        <div className="import-row row-one">
          <VideoMarker /> Kurobara - Afterimage.mp4
        </div>
        <div className="import-row row-two">
          <VideoMarker /> Miko - Signal Bloom.mkv
        </div>
        <div className="import-row row-three">
          <VideoMarker /> Aline - Ghost Loop.webm
        </div>
      </div>
      <div className="clip-count">6 clips rattaches</div>
      <Cursor />
    </div>
  )
}

function ScoreScene() {
  return (
    <div className="tutorial-screen score-screen">
      <div className="score-header">
        <button>
          <SkipForward size={13} /> Clip suivant
        </button>
        <span>Signal Bloom</span>
        <strong className="score-total-step">0 / 20</strong>
      </div>
      <div className="accordion target-category">
        <div className="accordion-title">
          Technique <ChevronDown size={12} />
        </div>
        <div className="score-row score-a">
          <span>Montage</span>
          <div className="score-input">8.5</div>
        </div>
        <div className="score-row score-b">
          <span>Rythme</span>
          <div className="score-input">4.0</div>
        </div>
        <div className="score-row score-c">
          <span>Impact</span>
          <div className="score-input">4.5</div>
        </div>
      </div>
      <div className="timecode-note">
        <span>00:43.12</span>
        Transition forte, synchro lisible.
      </div>
      <Cursor />
    </div>
  )
}

function ExportScene() {
  return (
    <div className="tutorial-screen export-screen">
      <div className="result-table">
        <div className="result-head">
          <span>Rang</span>
          <span>Clip</span>
          <span>Moyenne</span>
        </div>
        {resultRows.map(([rank, title, author, score]) => (
          <div className="result-row" key={title}>
            <span>{rank}</span>
            <strong>
              {title}
              <em>{author}</em>
            </strong>
            <b>{score}</b>
          </div>
        ))}
      </div>
      <div className="export-menu">
        <button className="export-json">Exporter concours JSON</button>
        <button className="export-png">Exporter image PNG</button>
        <button className="export-pdf">Exporter PDF</button>
      </div>
      <div className="export-done">
        <Check size={14} /> Exports prets
      </div>
      <Cursor />
    </div>
  )
}

function VideoMarker() {
  return <span className="video-marker" />
}

export function ResultsMockup() {
  return (
    <div className="results-mockup" aria-label="Apercu de table de resultats">
      <div className="results-toolbar">
        <span>Resultats finaux</span>
        <button>
          <Download size={13} /> Exporter
        </button>
      </div>
      <div className="result-table final">
        <div className="result-head">
          <span>Rang</span>
          <span>Clip</span>
          <span>Juge A</span>
          <span>Juge B</span>
          <span>Moyenne</span>
        </div>
        {resultRows.map(([rank, title, author, score]) => (
          <div className="result-row final-row" key={title}>
            <span>{rank}</span>
            <strong>
              {title}
              <em>{author}</em>
            </strong>
            <span>{(Number(score) - 2.1).toFixed(1)}</span>
            <span>{(Number(score) + 1.3).toFixed(1)}</span>
            <b>{score}</b>
          </div>
        ))}
      </div>
    </div>
  )
}
