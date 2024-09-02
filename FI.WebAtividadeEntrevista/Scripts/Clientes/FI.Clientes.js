
$(document).ready(function () {

    $('#CPF').mask('000.000.000-00');
    $('#CEP').mask('00000-000');
    $('#Telefone').mask('(00) 00000-0000');

    $('#formCadastro').submit(function (e) {
        e.preventDefault();

        const cpf = $(this).find("#CPF").val();
        const cep = $(this).find("#CEP").val();
        const telefone = $(this).find("#Telefone").val();

        if (!ValidarCPF(cpf)) {
            ModalDialog("Erro", "CPF inválido!");
            return; // Não envia o formulário se o CPF for inválido
        }

        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": cep.replace(/[^\d]+/g, ''),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": telefone.replace(/[^\d]+/g, ''), 
                "CPF": cpf.replace(/[^\d]+/g, ''), // Envia o CPF sem formatação
            },
            error: function (r) {
                if (r.status === 400) {
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                } else if (r.status === 500) {
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                }
            },
            success: function (r) {
                ModalDialog("Sucesso!", r);
                $("#formCadastro")[0].reset();
            }
        });
    });
});

function ModalDialog(titulo, texto) {
    const random = Math.random().toString().replace('.', '');
    const modalHTML = `
        <div id="${random}" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">${titulo}</h4>
                    </div>
                    <div class="modal-body">
                        <p>${texto}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>`;

    $('body').append(modalHTML);
    $('#' + random).modal('show');

    // Remove o modal após ele ser fechado para evitar acúmulo de elementos no DOM
    $('#' + random).on('hidden.bs.modal', function () {
        $(this).remove();
    });
}

function ValidarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove tudo que não for número

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false; // Verifica se tem 11 dígitos ou se todos os dígitos são iguais
    }

    const validarDigito = (base, multiplicadorInicial) => {
        let soma = 0;
        for (let i = 0; i < base.length; i++) {
            soma += parseInt(base.charAt(i)) * (multiplicadorInicial - i);
        }
        let digitoVerificador = (soma * 10) % 11;
        if (digitoVerificador === 10 || digitoVerificador === 11) {
            digitoVerificador = 0;
        }
        return digitoVerificador;
    };

    const primeiroDigitoVerificador = validarDigito(cpf.substring(0, 9), 10);
    const segundoDigitoVerificador = validarDigito(cpf.substring(0, 10), 11);

    return primeiroDigitoVerificador === parseInt(cpf.charAt(9)) &&
        segundoDigitoVerificador === parseInt(cpf.charAt(10));
}
