# BarberPro Agenda

Aplicação desenvolvida com **Vue 3**, **Vuetify 3** e **Vite** para demonstrar roteamento, componentização, diretivas Vue e persistência de dados em `localStorage`. O sistema simula a agenda de serviços de uma barbearia, incluindo CRUD completo de atendimentos, visão em cards e página institucional.

## ✨ Funcionalidades

- **CRUD de atendimentos** com formulários validados e sincronização instantânea com `localStorage`.
- **Listagem em cards** destacando o próximo atendimento, com ações rápidas de edição e exclusão.
- **Página "Sobre"** com informações do sistema, horários de funcionamento e timeline da barbearia.
- **Componentes reutilizáveis** (`AppointmentForm`, `AppointmentCard`, `ConfirmDialog`, `AppToolbar`) utilizando `props`, `emit` e `v-model` personalizado.
- **Diretivas Vue** (`v-for`, `v-if`, `v-else`, `v-bind`, `v-on`, `v-model`) aplicadas em toda a interface.
- **UI responsiva** usando layout, app bar, navigation drawer, cards, tabelas, diálogos, alerts e snackbars do Vuetify 3.

## 🚀 Como executar

```bash
npm install
npm run dev
```

O servidor será iniciado em `http://localhost:5173/` por padrão.

### Build de produção

```bash
npm run build
npm run preview
```

## 🗂️ Estrutura de rotas

- `/agenda` — visão geral em cards dos próximos atendimentos.
- `/atendimentos` — página de CRUD para criar, editar, listar e remover agendamentos.
- `/sobre` — informações da barbearia, horários e histórico.

## 🧠 Persistência

Os atendimentos são armazenados no navegador usando `localStorage` (chave `barberpro.appointments`). A interface reage automaticamente a qualquer alteração nos dados e sincroniza entre abas/janelas pela API de `storage`.

## 🔧 Tecnologias

- [Vue 3](https://vuejs.org/)
- [Vuetify 3](https://next.vuetifyjs.com/)
- [Vue Router 4](https://router.vuejs.org/)
- [Vite](https://vitejs.dev/)

## 📝 Observações

- Após instalar as dependências, o `npm audit` pode apontar vulnerabilidades moderadas de pacotes indiretos. Avalie antes de aplicar `npm audit fix --force`, pois pode introduzir breaking changes.
- Todas as telas estão em português e preparadas para demonstração acadêmica.


## 🛣️ Roadmap

Funcionalidades planejadas para versões futuras:

- [ ] Integração com API externa para backups dos atendimentos
- [ ] Autenticação de usuários (barbeiros e clientes)
- [ ] Filtros avançados e busca por nome/data
- [ ] Exportação de agenda em PDF/CSV
- [ ] Temas escuro/claro personalizáveis

## 🤝 Como contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b minha-feature`)
3. Commit suas alterações (`git commit -m 'feat: minha nova feature'`)
4. Faça push para a branch (`git push origin minha-feature`)
5. Abra um Pull Request

Contribuições de código, documentação, sugestões e issues são muito bem-vindas!

## ❓ FAQ

**1. Os dados são perdidos ao atualizar a página?**  
Não. Os dados ficam salvos no `localStorage` do navegador.

**2. Posso usar em produção?**  
Este projeto é para fins acadêmicos e demonstração. Para uso real, recomenda-se implementar autenticação e persistência em banco de dados.

**3. Como resetar todos os atendimentos?**  
Basta limpar o `localStorage` do navegador ou usar a opção de "Limpar agenda" (se disponível na interface).

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais informações.
