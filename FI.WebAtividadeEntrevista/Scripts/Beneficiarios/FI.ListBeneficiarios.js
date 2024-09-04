function alterarBeneficiario(id) {
    // Busca os dados do beneficiário pelo ID
    $.ajax({
        url: '@Url.Action("BuscarBeneficiario", "Beneficiario")', // Você precisará criar essa ação no controlador
        type: 'GET',
        data: { id: id },
        success: function (data) {
            if (data.success) {
                // Preenche os campos do modal com os dados do beneficiário
                $('#cpfBeneficiario').val(data.beneficiario.CPF);
                $('#nomeBeneficiario').val(data.beneficiario.Nome);

                // Atualiza a função de inclusão para agora funcionar como uma atualização
                $('#incluirBeneficiario').off('click').on('click', function () {
                    $.ajax({
                        url: '@Url.Action("Alterar", "Beneficiario")',
                        type: 'POST',
                        data: {
                            Id: id,
                            CPF: $('#cpfBeneficiario').val(),
                            Nome: $('#nomeBeneficiario').val()
                        },
                        success: function (response) {
                            if (response.success) {
                                $('#gridBeneficiarios').jtable('reload');
                                $('#cpfBeneficiario').val('');
                                $('#nomeBeneficiario').val('');
                            } else {
                                alert(response.message);
                            }
                        },
                        error: function () {
                            alert('Erro ao alterar o beneficiário.');
                        }
                    });
                });
            } else {
                alert('Erro ao buscar o beneficiário.');
            }
        },
        error: function () {
            alert('Erro ao buscar o beneficiário.');
        }
    });
}
