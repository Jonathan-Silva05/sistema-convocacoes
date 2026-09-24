const supabaseUrl = 'https://elffejhgusoajgpoxzic.supabase.co';
const supabaseKey = 'sb_publishable_-27NDXUj1fQ99ypZ0hhebQ_yi_vLCOP';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

let allConvocacoes = [];

async function fetchConvocacoes() {
  const { data, error } = await supabase
    .from('convocacoes')
    .select('*')
    .order('data_prova', { ascending: true })
    .order('horario_prova', { ascending: true });

  if (error) {
    console.error('Error fetching convocacoes:', error);
    document.getElementById('convocacoes-list').innerHTML = '<p>Não foi possível carregar as convocações.</p>';
    return;
  }

  allConvocacoes = data;
  renderConvocacoes(allConvocacoes);
}

function formatDate(dateString) {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

function formatTime(timeString) {
  return timeString.substring(0, 5); // Assuming format "HH:MM:SS" -> "HH:MM"
}

function renderConvocacoes(convocacoes) {
  const listContainer = document.getElementById('convocacoes-list');
  listContainer.innerHTML = '';

  const resultsCount = document.querySelector('.results-count');
  if (resultsCount) {
    resultsCount.innerHTML = `Sessões agendadas: <strong>${convocacoes.length} aluno${convocacoes.length !== 1 ? 's' : ''}</strong>`;
  }

  if (convocacoes.length === 0) {
    listContainer.innerHTML = '<p>Nenhuma convocação encontrada.</p>';
    return;
  }

  convocacoes.forEach(conv => {
    const card = document.createElement('article');
    card.className = 'card';

    card.innerHTML = `
      <div class="card-header">
        <span class="student-badge">Candidato(a)</span>
        <h2 class="student-name">${conv.nome_aluno}</h2>
      </div>

      <div class="card-info">
        <div class="info-row">
          <svg class="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span class="info-label">Avaliador:</span>
          <span class="info-value">${conv.avaliador}</span>
        </div>

        <div class="info-row">
          <svg class="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span class="info-label">Data:</span>
          <span class="info-value highlight">${formatDate(conv.data_prova)}</span>
        </div>

        <div class="info-row">
          <svg class="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="info-label">Horário:</span>
          <span class="info-value highlight">${formatTime(conv.horario_prova)} (Horário de Brasília)</span>
        </div>
      </div>

      <div class="card-actions">
        <a href="${conv.link_sala || '#'}" class="btn-virtual-room" role="button" ${!conv.link_sala ? 'style="pointer-events: none; opacity: 0.6;"' : ''} target="_blank">
          <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>${conv.link_sala ? 'Acessar Sala Virtual' : 'Link Indisponível'}</span>
        </a>
      </div>
    `;

    listContainer.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetchConvocacoes();

  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (event) => {
      const searchTerm = event.target.value.toLowerCase();
      const filteredConvocacoes = allConvocacoes.filter(conv =>
        conv.nome_aluno.toLowerCase().includes(searchTerm)
      );
      renderConvocacoes(filteredConvocacoes);
    });
  }
});
