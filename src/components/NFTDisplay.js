import React from 'react';

const NFTDisplay = ({ nfts }) => {
  // Check if nfts is defined and an array
  if (!nfts || !Array.isArray(nfts) || nfts.length === 0) {
    return <p>There is no valid ticket.</p>;
  }

  // Check if there are any valid tickets
  const hasValidTicket = nfts.some(nft => nft.name && nft.description && nft.image && nft.image.cachedUrl);

  // Display message if no valid tickets are found
  if (!hasValidTicket) {
    return <p>There is no valid ticket.</p>;
  }

  // Map through the NFTs and display their details
  return (
    <div>
      <h3>Valid Ticket Details:</h3>
      {nfts.map((nft, index) => (
        <div key={index}>
          <h4>{nft.name || 'No Name'}</h4>
          <p>{nft.description || 'No Description'}</p>
          {nft.image && nft.image.cachedUrl ? (
            <img src={nft.image.cachedUrl} alt={nft.name || 'NFT Image'} style={{ maxWidth: '300px' }} />
          ) : (
            <p>No Image Available</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default NFTDisplay;
