//CRUD EM JAVA

package device.domain.br.com.device.controller;

import device.domain.br.com.device.models.Usuarios;
import device.domain.br.com.device.repository.usuarioRepository;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import device.domain.br.com.device.records.loginDTO;

import java.util.List;
record LoginResponseDTO(String nome,String cpf, String senha, String email) {}
@RestController
@CrossOrigin
@RequestMapping("/usuarios")

public class usuarioController {

    @Autowired // o autowired busca instancias (0bjetos ) que são manipulados pelo próprio spring
    private usuarioRepository usuarioRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;


    @GetMapping("/")
    public List<Usuarios> getUsuarios() {
        return usuarioRepository.findAll();
    }

    @PostMapping(value = "/salvar", consumes = "application/json", produces = "application/json")
    public Usuarios salvar(@RequestBody Usuarios usuario) { //repare que acesso minha models Usuarios através do nome usuario (com u minusculo e singular)


        if (usuarioRepository.existsByCpf(usuario.getCpf())) {
            throw new RuntimeException("CPF já cadastrado, por favor informe um CPF válido");  //se o usuario colocar um cpf que já existe lança essa exceção

        }

        String senhaCriptografada = passwordEncoder.encode(usuario.getSenha());
        usuario.setSenha(senhaCriptografada);

        return usuarioRepository.save(usuario);
    }

    //TODO :tratativas de login de usuario(senha e email ou se o usuário preferir ele pode usar o cpf informando a senha)
    @PostMapping("/login")
        public ResponseEntity<?> login (@RequestBody loginDTO dadosLogin){
        System.out.println("==== Tentativa de Login ====");
        System.out.println("Identificador recebido: " + dadosLogin.cpf());
        System.out.println("Senha recebido: " + dadosLogin.senha());


            var usuarioOpt = usuarioRepository.findByCpfOrEmail(dadosLogin.cpf(),dadosLogin.cpf());
            if (usuarioOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário ou senha incorretos");
            }
            var usuario = usuarioOpt.get();
            System.out.println("Usuário encontrado! CPF no banco: " + usuario.getCpf() +"| Email no banco: " + usuario.getEmail());
        System.out.println("Senha criptografada no banco: " + usuario.getSenha());
        boolean senhaBate = passwordEncoder.matches(dadosLogin.senha(), usuario.getSenha());
        System.out.println("A senha bate com a criptografada? " + senhaBate);

        if (!senhaBate) {
            // PRINT 3: Se cair aqui, o usuário existe mas a senha enviada é diferente
            System.out.println("Resultado: Senha incorreta.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário ou senha incorretos!");
        }

           // if (!passwordEncoder.matches(dadosLogin.senha(), usuario.getSenha())) {
             //   return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário ou senha incorretos!");
            //}

        var resposta = new LoginResponseDTO(usuario.getNome(),usuario.getCpf(), usuario.getSenha(),usuario.getEmail() );
        System.out.println("Resultado: Login com sucesso para : " +usuario.getNome());
        return ResponseEntity.ok(resposta);

    }


    @DeleteMapping(value="/{id}",produces = "application/json")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        Usuarios usuario = usuarioRepository.findById(id).get();
        usuarioRepository.delete(usuario);
        System.out.println("Usuario removido com sucesso!");
        return ResponseEntity.ok().build();
    }

    @PutMapping(value= "/{id}",produces="application/json")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody Usuarios usuario) {
   Usuarios usuarioBanco = usuarioRepository.findById(id).get();
   usuarioBanco.setNome(usuario.getNome());
   usuarioBanco.setCpf(usuario.getCpf());
   usuarioBanco.setSenha(usuario.getSenha());
   usuarioBanco.setEmail(usuario.getEmail());
   usuarioBanco.setBairro(usuario.getBairro());
   usuarioBanco.setRua(usuario.getRua());
   usuarioBanco.setEstado(usuario.getEstado());
   if(usuario.getSenha()!=null && !usuario.getSenha().trim().isEmpty()){
       String senhaCriptografada = passwordEncoder.encode(usuario.getSenha());
       usuarioBanco.setSenha(senhaCriptografada);
   }


   usuarioRepository.save(usuarioBanco);
   System.out.println("Usuario atualizado com sucesso!");
        return ResponseEntity.ok().build();
    }

    }






