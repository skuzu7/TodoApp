# MyTodoApp: Uma Lista de Tarefas Elegante e Eficiente

## 📌 Descrição

**MyTodoApp** é uma aplicação de gestão de tarefas desenvolvida com  Django no backend e Angular e Bootstrap no frontend. para fins de estudo


## 🌟 Recursos

- 📝 **Adicionar Tarefas**: Crie tarefas com facilidade e organização.
- 🛠 **Editar Tarefas**: Atualize títulos e descrições conforme suas necessidades.
- ✅ **Marcar como Concluída**: Tenha a satisfação de concluir suas tarefas com um simples clique.
- 🗑 **Excluir Tarefas**: Mantenha sua lista limpa removendo tarefas desnecessárias.

## 🛠 Tecnologias Utilizadas

- **Backend**: Django (utilizando SQLite como banco de dados)
- **Frontend**: Angular (com NG Modules) & Bootstrap
- **Linguagem**: TypeScript e Python

## 📚 Pré-requisitos

- Angular & TypeScript (para o frontend)
- Python & Django (para o backend)



---

## 🚀 Configuração

### Clone o repositório
```bash
git clone https://github.com/skuzu7/TodoApp.git
cd TodoApp
```

### Backend (Django)
```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
python -m pip install -r requirements.txt

export DJANGO_DEBUG=1            # Windows (PowerShell): $env:DJANGO_DEBUG = "1"
python manage.py migrate
python manage.py runserver
```

### Frontend (Angular)
```bash
cd MyTodoAppFrontend
npm install
npm start
```

### Testes
```bash
DJANGO_SECRET_KEY=apenas-para-teste python manage.py test
```

## 🔒 Configuração e segurança

A configuração vem de variáveis de ambiente e falha fechada: sem `DJANGO_SECRET_KEY`
e sem `DJANGO_DEBUG=1`, a aplicação não inicia.

| Variável | Padrão | Função |
| --- | --- | --- |
| `DJANGO_DEBUG` | desligado | `1` ativa o modo de desenvolvimento e gera uma chave descartável por processo |
| `DJANGO_SECRET_KEY` | — (obrigatória fora do modo debug) | Chave secreta do Django; nunca vai para o repositório |
| `DJANGO_ALLOWED_HOSTS` | `localhost,127.0.0.1` | Hosts aceitos, separados por vírgula |
| `DJANGO_CORS_ALLOWED_ORIGINS` | `http://localhost:4200` | Origens de navegador que podem chamar a API |

- O banco local (`db.sqlite3`) e os arquivos `__pycache__` não são mais versionados; `migrate` recria o banco.
- A chave gerada pelo `startproject` que existia em versões antigas do `settings.py` foi aposentada e não é usada em lugar nenhum. Ela continua visível no histórico do Git, então nunca a reutilize.
- A API é um projeto de estudo e não tem autenticação. Antes de qualquer publicação, adicione autenticação e rode `python manage.py check --deploy`.

---


