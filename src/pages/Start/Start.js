import React from "react";
import "./start.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

// IMPORT ALL IMAGES
import accountsImg from "../../assets/StartPage/accounts.png";
import corporateImg from "../../assets/StartPage/corporate-actions.png";
import incomeImg from "../../assets/StartPage/income.png";
import ipaImg from "../../assets/StartPage/ipa.png";
import settlementImg from "../../assets/StartPage/settlements.png";
import taxImg from "../../assets/StartPage/tax.png";
import votingImg from "../../assets/StartPage/voting.png";

export default function StartPage({ user }) {
  const navigate = useNavigate();

  const teams = [
    { name: "Account Team", route: "/account-team", img: accountsImg },
    { name: "Corporate Actions Team", route: "/corporate-actions-team", img: corporateImg },
    { name: "Income Team", route: "/income-team", img: incomeImg },
    { name: "IPA Team", route: "/ipa-team", img: ipaImg },
    { name: "Settlement Team", route: "/settlement-team", img: settlementImg },
    { name: "Tax Team", route: "/tax-team", img: taxImg },
    { name: "Voting Team", route: "/voting-team", img: votingImg }
  ];

  const openTeamPage = (route) => {
    navigate(route);
  };

  return (
    <div className="start-page-container">
      <Header user={user} />

      <div className="start-grid">
        {teams.map((team, index) => (
          <div
            key={index}
            className="start-card"
            onClick={() => openTeamPage(team.route)}
          >
            <img src={team.img} alt={team.name} className="card-img" />
            <span className="card-text">{team.name}</span>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
