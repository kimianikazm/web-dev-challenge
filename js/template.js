ITEMTEMPLATE = `
                  <tr class="searchRow">
                    <th scope="row" id="NAME">
                      REPONAME
                    </th>
                    <td id="LANGUAGE"> REPOLANGUAGE</td>
                    <td id="TAG"> REPOTAG</td>
                    <td>
                      <button
                        class="btn btn-primary btn-md"
                        id="addButton"
                        onclick="addToFavourites('ADD')"
                      >
                        Favorite
                      </button>
                    </td>
                  </tr>`;

FAVTEMPLATE = `  <tr id="REPO" class="favRow">
                                      <th scope="row">
                                        TAGREPONAME
                                      </th>
                                      <td> TAGREPOLANGUAGE</td>
                                      <td> REPOTAGID</td>
                                      <td>
                                        <button
                                          class="btn btn-primary btn-md"
                                          id="removeButton"
                                          onclick="removeFromFavourites('REMOVE')"
                                        >
                                          Remove
                                        </button>
                                      </td>
                                    </tr>`;
