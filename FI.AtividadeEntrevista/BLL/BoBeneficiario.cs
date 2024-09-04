using System.Collections.Generic;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
        public long Incluir(DML.Beneficiario beneficiario)
        {
            DAL.Beneficiario.DaoBeneficiario dao = new DAL.Beneficiario.DaoBeneficiario();
            return dao.Incluir(beneficiario);
        }

        public void Alterar(DML.Beneficiario beneficiario)
        {
            DAL.Beneficiario.DaoBeneficiario dao = new DAL.Beneficiario.DaoBeneficiario();
            dao.Alterar(beneficiario);
        }

        public DML.Beneficiario Consultar(long id)
        {
            DAL.Beneficiario.DaoBeneficiario dao = new DAL.Beneficiario.DaoBeneficiario();
            return dao.Consultar(id);
        }

        public void Excluir(long id)
        {
            DAL.Beneficiario.DaoBeneficiario dao = new DAL.Beneficiario.DaoBeneficiario();
            dao.Excluir(id);
        }

        public List<DML.Beneficiario> Pesquisa(long clienteId, int iniciarEm, int quantidade, string campoOrdenacao, bool crescente, out int qtd)
        {
            DAL.Beneficiario.DaoBeneficiario dao = new DAL.Beneficiario.DaoBeneficiario();
            return dao.Pesquisa(clienteId, iniciarEm, quantidade, campoOrdenacao, crescente, out qtd);
        }
    }
}
