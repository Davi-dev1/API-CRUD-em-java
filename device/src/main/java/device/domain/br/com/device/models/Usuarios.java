package device.domain.br.com.device.models;

import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")


public class Usuarios {

    @Id
    @Column(name = "usuario_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long usuarioId;

    @Column(nullable=true, unique=false)
    private String nome;


    @Column(nullable = true, unique=true)
    public String cpf;

    @Column(nullable=true, unique=false)
    private String Rua;

    @Column(nullable=true, unique=false)
    private String bairro;

    @Column(nullable=true, unique=false)
    private String cidade;

    @Column(nullable=true, unique=false)
    private String Estado;

    @Column(nullable=true, unique=false)
    private String email;

    @Column(nullable=true, unique=true)
    private String senha;

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getRua() {
        return Rua;
    }

    public void setRua(String rua) {
        Rua = rua;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getEstado() {
        return Estado;
    }

    public void setEstado(String estado) {
        Estado = estado;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}
