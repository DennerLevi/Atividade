namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
        /// <summary>
        /// Inclui um novo beneficiário
        /// </summary>
        /// <param name="beneficiario">Objeto de beneficiário</param>
        public long Incluir(DML.Beneficiario beneficiario)
        {
            DAL.Beneficiario.DaoBeneficiario dao = new DAL.Beneficiario.DaoBeneficiario();
            return dao.Incluir(beneficiario);
        }

        /// <summary>
        /// Altera um beneficiário
        /// </summary>
        /// <param name="beneficiario">Objeto de beneficiário</param>
        public void Alterar(DML.Beneficiario beneficiario)
        {
            DAL.Beneficiario.DaoBeneficiario dao = new DAL.Beneficiario.DaoBeneficiario();
            dao.Alterar(beneficiario);
        }

        /// <summary>
        /// Consulta o beneficiário pelo id
        /// </summary>
        /// <param name="id">Id do beneficiário</param>
        /// <returns>Objeto Beneficiário</returns>
        public DML.Beneficiario Consultar(long id)
        {
            DAL.Beneficiario.DaoBeneficiario dao = new DAL.Beneficiario.DaoBeneficiario();
            return dao.Consultar(id);
        }

        /// <summary>
        /// Excluir o beneficiário pelo id
        /// </summary>
        /// <param name="id">Id do beneficiário</param>
        public void Excluir(long id)
        {
            DAL.Beneficiario.DaoBeneficiario dao = new DAL.Beneficiario.DaoBeneficiario();
            dao.Excluir(id);
        }
    }
}
