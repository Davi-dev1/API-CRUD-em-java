package device.domain.br.com.device.repository;

import device.domain.br.com.device.models.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface usuarioRepository extends JpaRepository<Usuarios,Long> {

    boolean existsByCpf(String cpf);
   Optional<Usuarios>findByCpfOrEmail(String cpf, String email);

}
// amanhã arrume o bang da senha pq quando vai atualizar parece que já existe senha assim