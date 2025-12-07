import React from 'react';

export const App: React.FC = () => {
  return (
    <div className="app-shell">
      <div className="login-card">
        <header>
          <h1>Bem-vindo de volta</h1>
          <p>Entre com suas credenciais para acessar o CONTRI System.</p>
        </header>

        <form>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input id="email" name="email" type="email" placeholder="seu@email.com" required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input id="password" name="password" type="password" placeholder="••••••••" required />
          </div>

          <button type="submit">Entrar</button>
        </form>

        <p className="helper-text">
          Esqueceu sua senha? <a href="#">Recuperar acesso</a>
        </p>
      </div>
    </div>
  );
};
